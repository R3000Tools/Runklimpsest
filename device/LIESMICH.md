# Runklimpsest – Oberflächen-Prototyp 0.1.2 (Max for Live)

Granular Particle Memory – **nur Oberfläche, keine Klangverarbeitung**. Das Audio läuft unverändert durch.
Die Anzeigen reagieren aber auf das Eingangssignal (DOSE, Pufferanzeige, Meter).

## Dateien

| Datei | Zweck |
|---|---|
| `Runklimpsest.amxd` | das Gerät (Audio-Effekt) |
| `runklimpsest_ui.js` | Zeichnen und Teilchen-Engine – **muss im selben Ordner wie die `.amxd` liegen** |
| `Runklimpsest.maxpat` | derselbe Patch als Max-Datei (Notlösung, siehe unten) |
| `build_device.py` | erzeugt `.amxd` und `.maxpat` neu (`python3 build_device.py`) |

## Installation

1. Ordner `Runklimpsest` nach `Dokumente\Ableton\User Library\Presets\Audio Effects\Max Audio Effect\` kopieren
   (oder an einen beliebigen Ort, beide Dateien zusammen lassen).
2. In Live: `Runklimpsest.amxd` aus dem Browser auf eine Audiospur ziehen.
3. Wenn das Gerät „waiting for engine…“ zeigt oder leer bleibt: `runklimpsest_ui.js` liegt nicht neben der `.amxd`.
4. Optional, damit das Gerät auch ohne die JS-Datei läuft: Gerät bearbeiten (Edit-Symbol), in Max **Freeze** (Schneeflocke) und speichern.

**Notlösung, falls Live die `.amxd` nicht öffnet:** leeres „Max Audio Effect“ auf eine Spur ziehen → Edit → in Max `Runklimpsest.maxpat` öffnen → alles markieren (Strg+A) → kopieren → in den Geräte-Editor einfügen (vorhandene `plugin~`/`plugout~` vorher löschen) → als `Runklimpsest.amxd` neben `runklimpsest_ui.js` speichern.

## Bedienung

| Element | Funktion |
|---|---|
| CHAMBER | Teilchen fallen, Aufprall = Grain (Ring). X-Position = Stelle im Puffer |
| SYNC + Division | An: Teilchen warten (hohler Ring) bis zum nächsten Rasterschritt (1/4 … 1/32). Leiste oben = 16 Schritte |
| MORE | öffnet die Large View |
| MEMORY | Puffer (2 Takte) mit dem echten Eingangspegel; Abnutzung färbt orange und drückt die Balken |
| FREEZE | Schreibkopf stoppt, der Puffer wird nur noch abgenutzt |
| GRAVITY, BOUNCE, SWARM | Physik: Fallgeschwindigkeit, Elastizität, Teilchenzahl |
| EROSION | wie stark ein Aufprall die Stelle abnutzt |
| DOSE (Ring) | steigt bei Signal, sinkt in Stille. **Klick auf den Ring = Reset** |
| MIX | Parameter vorhanden, wirkt noch nicht (keine Klangverarbeitung) |

**Large View:** Zeile LINKED = dieselben Regler wie im Gerät (Spiegel). Zeile DETAIL = Grain, Heal, Dose Rate, Dose Recover, Output, Wear Type, Dose Target, Reset Dose – nur hier sichtbar, aber trotzdem automatisierbar (die Parameter liegen versteckt im Gerät).

## Bitte testen (Feedback-Format: *Bereich / Element / Wert / Problem*)

1. Lädt das Gerät, laufen Teilchen und Pufferanzeige?
2. Abspielen: steigt DOSE, füllt sich MEMORY mit dem Pegel?
3. Klick auf den DOSE-Ring: springt er auf 0 %?
4. SYNC an/aus und Division bei laufendem Transport: feuern die Grains im Raster?
5. Large View öffnen, Regler dort bewegen: bewegt sich der Regler im Gerät mit (und umgekehrt)?
6. Automation: Gibt es pro Funktion genau **eine** Spur (16 Parameter, keine doppelten)?
7. Projekt speichern, neu laden: sind alle Werte wieder da?
8. CPU-Anzeige von Live mit offener Large View.

## Bekannte Grenzen (Prototyp)

- Keine Klangverarbeitung; MIX, OUTPUT, GRAIN, WEAR TYPE wirken nur auf die Anzeige bzw. gar nicht.
- Takt-Länge für DOSE und Puffer ist fest auf 120 BPM gerechnet (Annahme).
- SYNC-Raster kommt von `metro` und läuft nur bei laufendem Transport; bei Stopp ein interner Ersatztakt.
- Ohne `runklimpsest_ui.js` daneben (und ohne Freeze) bleiben die Anzeigen leer.
- Schrift „Ableton Sans“ wird von Live bereitgestellt; in Max allein kann eine Ersatzschrift erscheinen.
- Ungeprüft in Live: Die Dateien wurden in einem Linux-Container erzeugt, ohne Max/Live. Patch-Struktur und Skript sind maschinell geprüft, nicht das Verhalten in Live.
