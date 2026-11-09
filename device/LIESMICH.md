# Runklimpsest – 0.2.9 (Max for Live)

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
| MEMORY | Wellenform des Puffers (2 Takte im Song-Tempo): cyan = Audio, dünne Kontur = frische Aufnahme, orange/schraffiert = abgenutzt; Streifen unten = Abnutzung je Stelle, weiße Linien = gerade gelesen, cyan Linie = Schreibkopf |
| FREEZE | Schreibkopf stoppt, der Puffer wird nur noch abgenutzt |
| GRAVITY, BOUNCE, SWARM | Physik: Fallgeschwindigkeit, Elastizität, Teilchenzahl |
| EROSION | wie stark ein Aufprall die Stelle abnutzt |
| DOSE (Ring) | steigt bei Signal, sinkt in Stille. **Klick auf den Ring = Reset** |
| MIX | Original ↔ Grains (gleiche Leistung), Standard 50 % |
| GRAIN (Large View) | Grain-Länge 5–500 ms (Standard 30 ms): kurz = Körnung/Klicks, lang = Fetzen/Flächen |
| EROSION / WEAR TYPE | wie stark und wie jedes Abspielen die Stelle abnutzt: SAT (Sättigung), TAPE (dumpf, Rauschen), BIT (körnig) |
| HEAL (Large View) | wie schnell sich der Puffer erholt |
| STEREO / MONO (Large View) | Grains nach X-Position verteilt (±70 %) oder mittig |

**Large View:** CHAMBER und MEMORY nebeneinander (mit IN/OUT-Metern), darunter vier Karten nach Funktion – PHYSICS, MEMORY, DOSE, OUTPUT (inkl. STEREO | MONO). Ein cyan Punkt am Namen heißt: gibt es auch im Gerät. Alle Parameter sind automatisierbar.

Knobs (Gerät und Large View): ziehen = ändern, Shift = fein, Doppelklick = Standardwert. Notenwert im Gerät: Klick öffnet die Liste, Klick auf einen Eintrag wählt ihn.
Automation: alle 16 Parameter über die Automationsauswahl der Spur; Regler-Bewegungen bei Aufnahme werden aufgezeichnet. Push/Controller mit Geräte-Steuerung: Bänke „Main“, „Detail“ und „Reset“. MIDI-Map per Klick auf die Regler (Strg+M) ist bei dieser Oberfläche nicht möglich.
Magenta-Schimmer oben in CHAMBER/MEMORY = Dosis, dort wo sie wirkt (TARGET). DOSE ist kein Regler, sondern eine Anzeige: steigt nur bei laufendem Audio-Signal (Geschwindigkeit über RATE), fällt in Stille (RECOVER), Klick auf den Ring = Reset auf 0 % (Ring blinkt kurz).

## Bitte testen (Feedback-Format: *Bereich / Element / Wert / Problem*)

1. Lädt das Gerät, laufen Teilchen und Pufferanzeige?
2. Abspielen: steigt DOSE, zeigt MEMORY die **echte Wellenform** (Kicks/Snares erkennbar)? Bei FREEZE: werden gelesene Stellen orange?
3. Klick auf den DOSE-Ring: springt er auf 0 %?
4. SYNC an/aus und Division bei laufendem Transport: feuern die Grains im Raster?
5. Large View öffnen, Regler dort bewegen: bewegt sich der Regler im Gerät mit (und umgekehrt)?
6. Automation: Gibt es pro Funktion genau **eine** Spur (16 Parameter, keine doppelten)?
7. Projekt speichern, neu laden: sind alle Werte wieder da?
8. CPU-Anzeige von Live mit offener Large View (MEMORY zeichnet jetzt deutlich mehr).
9. MEMORY: baut sich die Wellenform am Schreibkopf flüssig auf? Glüht jeder Aufprall orange nach (auch bei SWARM 1)?
10. CHAMBER: Gehen die Würfe jetzt in die obere Hälfte? Klingt der Rhythmus mit SYNC wie vorher?
11. GRAVITY schnell von 1 auf 0: schießen die Teilchen hoch, Strich an der Oberkante, fallen sie wieder ein?
12. Neue Instanz: GRAIN steht auf 30 ms. Bass und Drums: besser als mit 5 ms?
13. FREEZE an, dann Eingang stoppen (Clip aus): bleibt der eingefrorene Loop gleich laut? (0.2.8: ca. 20 dB leiser)
14. Abnutzung (EROSION 65 %, FREEZE, 30 s): jetzt hörbar? SAT rauer, TAPE dumpfer, BIT körniger?

## Bekannte Grenzen (Prototyp)

- Klang nur per Simulation geprüft, Hörtest in Live steht aus.
- SYNC-Raster kommt von `metro` und läuft nur bei laufendem Transport; bei Stopp ein interner Ersatztakt.
- Ohne `runklimpsest_ui.js` daneben (und ohne Freeze) bleiben die Anzeigen leer.
- Schrift „Ableton Sans“ wird von Live bereitgestellt; in Max allein kann eine Ersatzschrift erscheinen.
- Ungeprüft in Live: Die Dateien wurden in einem Linux-Container erzeugt, ohne Max/Live. Patch-Struktur und Skript sind maschinell geprüft, nicht das Verhalten in Live.
