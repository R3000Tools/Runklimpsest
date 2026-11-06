# Runklimpsest – Projektregeln für Claude

Max-for-Live-Audio-Effekt „Granular Particle Memory“ (Hersteller R3000). Stand: Oberflächen-Prototyp, **noch keine Klangverarbeitung** (Audio läuft unverändert durch).
Der Nutzer testet in Ableton Live 12 (aktuelle Version, mitgeliefertes Max) unter Windows und spricht Deutsch. Antworten und Doku für ihn auf Deutsch, Code, Commits und GUI-Texte auf Englisch.
Antwortstil: direkt, strukturiert, Listen, kein Smalltalk, keine Emojis, Schwächen/Risiken nennen; bei konzeptionellen Aufgaben am Ende Abschnitt „Optimierung“.

## Grundsatz
Eigenständiges Gerät, kein Clone. Inspiration (Freakshow Industries, Sinevibes, Granular-Geräte) ja, Code/Grafik/Namen anderer Produkte nein. Farb- und Formsprache wie Runkelizer FX (eigene R3000-Produktfamilie).

## Wichtige Dokumente
- `docs/KONZEPT.md` – Produktidee (C Teilchen-Engine, A Puffer-Abnutzung, F Dosis), Parameter, Parameter-Regel, GUI-Entscheidungen
- `docs/BACKLOG.md` – offene Punkte und Ideen; neue Vorschläge dort eintragen, Erledigtes abhaken
- `CHANGELOG.md` – pro Version
- `device/LIESMICH.md` – Installation, Bedienung, Testliste (liegt jedem Download bei)

## Aufbau
| Pfad | Inhalt |
|---|---|
| `device/build_device.py` | erzeugt `Runklimpsest.maxpat` und `Runklimpsest.amxd` – **Patch nie von Hand ändern, immer über dieses Skript** |
| `device/runklimpsest_ui.js` | jsui: Teilchen-Engine und alle Anzeigen (Modi `device`, `large`, `controls`, `title`); Block `BEGIN/END GENERATED` (Parameter, Layout, Version) schreibt der Generator |
| `device/Runklimpsest.amxd` | generiertes Gerät (ungefroren, braucht die JS-Datei daneben) |
| `tests/smoke.js` | JS in Node mit nachgebildeter Max-API: Engine, alle Modi, DOSE-Reset |
| `tests/render.js` | zeichnet Chamber, Dose und Large-View-Regler im Browser (Canvas-Nachbildung von mgraphics) und prüft Klick/Ziehen |
| `tests/layout.js` | Präsentations-Layout von Gerät und Large View als Kästchen (Überlappungen finden) |

## Bauen und prüfen (Linux-Container)
```
python3 device/build_device.py
node --check device/runklimpsest_ui.js
node tests/smoke.js
node tests/render.js render.png
node tests/layout.js layout.png
```
Max/Live gibt es im Container nicht: Verhalten in Live prüft nur der Nutzer. Vorschaubilder immer als „Nachbildung, nicht aus Live“ kennzeichnen.

## Arbeitsregeln
1. Vor jedem Push: Generator gelaufen, `node --check`, `smoke.js` und `render.js` ohne Fehler, Patch ohne Verbindungen ins Leere.
2. **Parameter-Regel:** Jede Funktion genau einmal als `live.*`-Objekt mit Parameter Mode im Geräte-Patcher. Im Gerät liegen alle Parameter **versteckt** (Automation und Push-Bänke `BANKS` funktionieren ohne GUI-Objekt; keine zusätzliche Leiste – Nutzerentscheidung nach 0.1.9); die eine jsui `device` zeichnet die Oberfläche und wertet ihre Klicks selbst aus (`<name> <wert>` → `[route uid open …]` → `[route <parameter>]` → `[s ---<name>_c]`). Die Large View enthält **keine** Parameter: Ihre Bedienelemente zeichnet die jsui `controls`, Änderungen gehen als `<name> <wert>` → `[route]` → `[s ---<name>_c]` an das Original. Live-Spiegel ohne Parameter (`parameter_enable 0`) verlieren Namen, Einheiten und Auswahllisten (Befund 0.1.1) – nicht verwenden.
3. Parameter-Namen (`parameter_longname`) nie ändern ohne Hinweis im CHANGELOG (Automation in Projekten geht verloren).
4. Max-JS (js/jsui) ist ES5: kein `let`/`const`, keine Pfeilfunktionen, keine Template-Strings. Funktionsnamen dürfen nicht mit Variablennamen kollidieren (Nachrichten an jsui rufen Funktionen gleichen Namens).
5. Gerätelokale Sende-Namen immer mit `---` (`[s ---rk_param]`), sonst sprechen mehrere Instanzen miteinander.
6. Klang lässt sich hier nicht hören: Messwerte/Annahmen nennen, Hörtest beim Nutzer anfragen.

## Bekannte Fallstricke
- `live.text` im Button-Modus: Ausgabe kann je nach Version `bang` oder `1`/`0` sein → immer über `[t b]`, nie `[sel 1]` (MORE öffnete in 0.1.0 nicht).
- Large View öffnet über zwei Wege: `open` → `[pcontrol]` → `[p LargeView]` und `[s ---rk_open]` → `front` → `[thispatcher]`.
- Gemeinsamer Zustand zwischen den jsui-Instanzen über `new Global(uid)` (`G.state`, `G.params`); die Geräte-jsui erzeugt die uid und verteilt sie über `[s ---rk_uid]` (alle 2 s erneut, wegen Ladereihenfolge).
- Tempo/Taktart kommen über `live.path live_set` → `live.observer @property tempo|signature_numerator|signature_denominator` → jsui (`tempo`, `signum`, `sigden`).
- Keine Titelzeile im Gerät (Name steht in Lives Gerätetitelzeile).
- **Nichts über die jsui `device` legen.** In Live scheiterten 0.1.3–0.1.6 alle Stapel-Varianten: transparente `live.*` darüber (keine Klicks bzw. jsui schluckt sie), Hintergrund-Layer + `panel` (alles unsichtbar), transparente `live.dial` (keine Klicks), `live.menu`-Popup (übernimmt transparente Textfarbe), kleine Widget-jsuis darüber (unsichtbar), `live.meter~` darüber (unsichtbar). Auch Meter, MORE und DOSE-Reset (Klick auf den Ring) macht die jsui selbst.
- **Gesicherter Befund (0.1.11):** In Live wird eine jsui über allen anderen Objekten gezeichnet, egal wo sie in der Box-Liste steht. Mit `ignoreclick 1` kommen Klicks bei darunterliegenden `live.text`/`live.menu` an, Ziehen bei `live.dial`/`live.numbox` nicht; Strg+M an diesen Objekten geht auch nicht. Darum `OVERLAY_CONTROLS = False`: kein Live-Objekt im Bereich der jsui, die jsui wertet alle Klicks selbst aus. MIDI-Map per Klick ist mit dieser Oberfläche nicht machbar (Nutzer will keinen zusätzlichen GUI-Bereich) – Zuweisung über Automation und Push-Bänke.
- Keine jsui-Funktion darf wie ein Parameter heißen (0.1.3: `grain`); `tests/smoke.js` prüft alle Parameter-Nachrichten.
- SYNC-Raster kommt von `[metro 16n]` (läuft nur bei laufendem Transport); bei Stopp interner Ersatztakt in der Engine.
- Schrift „Ableton Sans“ stellt Live bereit.

## Versionen und Auslieferung
- Versionsnummer in `device/build_device.py` (`VERSION`) – erscheint im Gerät; Überschrift in `device/LIESMICH.md` mitziehen.
- Jede Version: Nummer erhöhen, Abschnitt `## x.y.z` oben in `CHANGELOG.md`.
- Auslieferung an den Nutzer als ZIP im Chat (`Runklimpsest-vX.Y.Z-UI-Prototyp.zip` mit Inhalt von `device/`); kein CI.
- Arbeitsbranch: `claude/runklimpsest-v0.1`.

## Feedback-Format des Nutzers
*Bereich / Element / Wert / Problem*, z. B. „Large View / Gravity / – / bewegt Gerät nicht mit“.
