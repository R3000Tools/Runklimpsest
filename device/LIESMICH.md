# Runklimpsest – 0.3.0 (Max for Live)

Granular Particle Memory: Teilchen fallen in der Chamber, jeder Aufprall spielt ein Grain aus den letzten 2 Takten. Jedes Abspielen nutzt die gespielte Stelle ab (Palimpsest).
Latenz: 0 Samples.

## Dateien

| Datei | Zweck |
|---|---|
| `Runklimpsest.amxd` | das Gerät (Audio-Effekt) |
| `runklimpsest_dsp.genexpr` | Quelltext der Klangverarbeitung (ist im Gerät eingebettet, nur zur Information) |
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
| CHAMBER | Teilchen fallen, Aufprall = Grain (Blitz am Boden + Ring). X-Position = Stelle im Puffer, Teilstriche = Schläge/16tel |
| SYNC + Division | An: Teilchen warten (hohler Ring) bis zum nächsten Rasterschritt (1/4 … 1/32, Song-Tempo). Leiste oben = 16 Schritte |
| LARGE VIEW | öffnet die Large View (schließen: Fenster-X) |
| MEMORY | Wellenform des Puffers (2 Takte im Song-Tempo): cyan = Audio, dünne Kontur = frische Aufnahme, orange/schraffiert = abgenutzt; Streifen unten = Abnutzung je Stelle, weiße Linien = gerade gelesen (magenta „REV“ = rückwärts), cyan Linie = Schreibkopf |
| FREEZE | Schreibkopf stoppt, der Puffer wird nur noch abgenutzt |
| GRAVITY, BOUNCE, SWARM | Physik: Fallgeschwindigkeit, Elastizität, Teilchenzahl |
| SIZE | Grain-Länge 5–500 ms (Standard 30 ms): kurz = Körnung/Klicks (Drums), lang = Fetzen/Flächen (Pads, Gesang) |
| PITCH | Tonhöhe jedes Grains −12…+12 Halbtöne (rastet), höher = kürzer |
| REVERSE | Anteil rückwärts gespielter Grains (0–100 %) |
| EROSION | wie stark ein Aufprall die Stelle abnutzt (am deutlichsten mit FREEZE) |
| MIX | Original ↔ Grains (gleiche Leistung), Standard 50 % |
| PITCH MODE (Large View) | FIXED = alle Grains gleich, RANDOM = zufällig bis ±PITCH, IMPACT = harte Aufpralle voller PITCH, Nachsprünge weniger |
| WEAR TYPE (Large View) | wie die Abnutzung klingt: SAT (Sättigung), TAPE (dumpf, Rauschen), BIT (körnig) |
| HEAL (Large View) | wie schnell sich der Puffer erholt |
| OUTPUT, STEREO / MONO (Large View) | Ausgangspegel; Grains nach X-Position verteilt (±70 %) oder mittig |

**Large View:** CHAMBER und MEMORY nebeneinander (mit IN/OUT-Metern), darunter vier Karten nach Funktion – PHYSICS, GRAIN, MEMORY, OUTPUT. Ein cyan Punkt am Namen heißt: gibt es auch im Gerät. Alle 16 Parameter sind automatisierbar.

Knobs (Gerät und Large View): ziehen = ändern, Shift = fein, Doppelklick = Standardwert. Notenwert im Gerät: Klick öffnet die Liste, Klick auf einen Eintrag wählt ihn.
Automation: alle 16 Parameter über die Automationsauswahl der Spur; Regler-Bewegungen bei Aufnahme werden aufgezeichnet. Push/Controller mit Geräte-Steuerung: Bank „Main“ = die 8 Regler des Geräts, Bank „Detail“ = der Rest. MIDI-Map per Klick auf die Regler (Strg+M) ist bei dieser Oberfläche nicht möglich.

## Bitte testen (Feedback-Format: *Bereich / Element / Wert / Problem*)

1. Lädt das Gerät (jetzt 634 px breit), laufen Teilchen und Pufferanzeige?
2. Regler im Gerät: oben GRAVITY · BOUNCE · SWARM · SIZE, unten PITCH · REVERSE · EROSION · MIX – alle bedienbar (Ziehen, Shift fein, Doppelklick = Standard)?
3. PITCH: rastet auf ganze Halbtöne, Bogen von der Mitte? +12 / −12 auf Bass und Gesang: klingt es eine Oktave höher/tiefer?
4. PITCH MODE in der Large View: RANDOM (Vocals) und IMPACT (Drums mit SYNC) – musikalisch brauchbar?
5. REVERSE 25 % / 100 %: rückwärts gespielte Grains hörbar, magenta „REV“ in MEMORY? Klicks?
6. EROSION 65 % mit FREEZE, 30 s: Abnutzung hörbar (gleiche Stärke wie 0.2.9)?
7. FREEZE an, Eingang stoppen: bleibt der Loop gleich laut?
8. Automation: 16 Parameter, keine DOSE-Parameter mehr; Size statt Grain?
9. Projekt speichern, neu laden: sind alle Werte wieder da?
10. Push (falls vorhanden): Bank 1 = die 8 Regler des Geräts?
11. CPU mit offener Large View, 2–3 Instanzen.

## Bekannte Grenzen (Prototyp)

- Klang nur per Simulation geprüft, Hörtest in Live steht aus.
- SYNC-Raster kommt von `metro` und läuft nur bei laufendem Transport; bei Stopp ein interner Ersatztakt.
- Ohne `runklimpsest_ui.js` daneben (und ohne Freeze) bleiben die Anzeigen leer.
- Schrift „Ableton Sans“ wird von Live bereitgestellt; in Max allein kann eine Ersatzschrift erscheinen.
- Ungeprüft in Live: Die Dateien wurden in einem Linux-Container erzeugt, ohne Max/Live. Patch-Struktur und Skript sind maschinell geprüft, nicht das Verhalten in Live.
