# Runklimpsest – Konzept

Arbeitstitel-Verlauf: Palimpsest → Runpalimpsest → **Runklimpsest**.

## Idee in einem Satz
Grains sind Teilchen, die beim Aufprall Klang erzeugen und dabei ihre eigene Erinnerung abnutzen.

## Drei Bausteine
| Baustein | Rolle | Inspiration (nicht kopiert) |
|---|---|---|
| **C – Teilchen-Engine** | Teilchen fallen und springen in der Chamber; Aufprall am Boden löst ein Grain aus. X-Position = Lesestelle im Puffer, Aufprallgeschwindigkeit = Lautstärke/Tonhöhe. Rhythmus entsteht aus Physik (beschleunigend/abklingend), optional ins Raster gezogen (SYNC). | Sinevibes Dispersion (Echos wie springender Ball) |
| **A – Palimpsest** | Jedes Lesen verändert die gelesene Stelle im Puffer (Sättigung, Tape, Bit). Oft gelesene Stellen werden dumpf/kaputt; der Schreibkopf überschreibt mit frischem Audio, außer bei FREEZE – dann verfällt der Loop. | Freakshow Mishby (Tape-Abnutzung), Albedo (Freeze-Wolke) |
| **F – Dose** | Gedächtnis über die Zeit: steigt bei Signal (RATE), sinkt in Stille (RECOVER), moduliert Teilchenzahl und/oder Abnutzung (TARGET). Reset per Klick auf den Ring. | Freakshow-Makro-Denken (Void/Dose/Secret) |

Abgrenzung: Zufall+Freeze-Wolken, tempo-synchrone Grain-Sequencer (inkl. euklidischer Trigger, z. B. Celium), Effekte pro Grain und Multiband-Granular gibt es bereits. Eigenständig ist die Kopplung Physik → Lesestelle → Abnutzung der Quelle → Langzeitzustand.

## Parameter (16, alle im Gerät)
| Parameter | Bereich | Standard | sichtbar |
|---|---|---|---|
| Gravity | 0–1 g | 0,62 | Gerät + Large View |
| Bounce | 0–100 % | 80 % | Gerät + Large View |
| Swarm | 1–24 | 12 | Gerät + Large View |
| Erosion | 0–100 % | 55 % | Gerät + Large View |
| Mix | 0–100 % | 50 % | Gerät + Large View |
| Freeze | aus/an | aus | Gerät + Large View |
| Sync | aus/an | an | Gerät + Large View |
| Division | 1/4, 1/8, 1/16, 1/32 | 1/16 | Gerät + Large View |
| Grain | 5–500 ms | 80 ms | nur Large View |
| Heal | 0,5–60 s | 30 s | nur Large View |
| Dose Rate | 1–32 Takte | 4 | nur Large View |
| Dose Recover | 1–64 Takte | 12 | nur Large View |
| Output | −24…+12 dB | 0 dB | nur Large View |
| Wear Type | SAT, TAPE, BIT | SAT | nur Large View |
| Dose Target | ALL, SWARM, WEAR | WEAR | nur Large View |
| Dose Reset | Taster | – | DOSE-Ring (Klick), Large View |
| Stereo | STEREO, MONO | STEREO | nur Large View (OUTPUT) |

**Stereo (Startwert):** STEREO verteilt jedes Grain nach seiner X-Position in der Chamber im Panorama, links = links. Abbildung auf **±70 %** (nicht volle Breite: Grains an den Wänden würden sonst hart außen landen), Pan-Gesetz **−3 dB** (Constant Power). MONO: alle Grains in der Mitte. Prüfen im Hörtest (BACKLOG).

„Nur Large View“ heißt: Der Parameter liegt unsichtbar im Gerät (automatisierbar, wird gespeichert), bedienbar ist er im großen Fenster.

## Parameter-Regel
Jede Funktion genau einmal als `live.*`-Parameter im Gerät. Die Large View zeichnet ihre Bedienelemente selbst (jsui) und schickt Änderungen an das Original; das Original meldet zurück. Ergebnis: eine Automationsspur pro Funktion, Undo und Mapping laufen über das Original.

## Oberfläche
- Gerät 580 × 169 px ohne Titelzeile, Raster (0.1.13): 3 Spalten CHAMBER | MEMORY | CONTROLS (3×2: GRAVITY, BOUNCE, SWARM / EROSION, DOSE, MIX) plus IN/OUT-Meter; eine Kopfzeile, eine Button-Zeile (SYNC + Division, FREEZE, LARGE VIEW). Gezeichnet und bedient von einer jsui; Parameter versteckt.
- Large View 960 × 620 px: Kopfzeile (Logo, Legende, Tempo), große Chamber, MEMORY, WEAR HISTORY, Kennzahlen; unten vier Karten nach Funktion (PHYSICS, MEMORY, DOSE, OUTPUT), Inhalte mittig, cyan Punkt = auch im Gerät. Kein CLOSE (Fenster-X).
- Stil: Runkelizer FX (Verlauf #23262e → #0a0a0d, Farbe pro Bereich: Cyan Chamber/Physics, Orange Memory/Wear, Magenta Dose; LED-Buttons; Meter grün → rot). Alle Texte Englisch, keine Bereichs-Hinweise unter den Reglern (Platz).
- GUI-Entwürfe (Iterationen 1–8): Claude-Artifact „Palimpsest M4L GUI“ (privat beim Nutzer).

## Klangverarbeitung (0.2.1)
- gen~-Codebox `device/runklimpsest_dsp.genexpr`, Latenz 0, 32 Grain-Stimmen, Puffer „fresh“ + „worn“ (je stereo, max. 800 000 Samples).
- Aufprall → Ereignis (Position, Stärke, Panorama, Zeitversatz) → Stimme. Lesen aus „worn“, Rückschreiben einer abgenutzten Fassung (Palimpsest); HEAL zieht „worn“ zu „fresh“.
- Effektanteil: Mono-Summe je Grain, Pan aus X (±70 %, −3 dB) oder mittig; Dichte-Normalisierung, Pegelangleich an den Eingang, Begrenzer mit Vorlauf, DC-Filter; MIX mit gleicher Leistung; OUTPUT; Schutzbegrenzer.
- Rhythmus (0.2.2): Teilchen werfen auf dem DIVISION-Raster, der Hauptschlag landet ein ganzzahliges Vielfaches später (samplegenau vorgemerkt), Nachsprünge frei; SYNC rastet zusätzlich alle Aufpralle ein.
- Abnutzung (0.2.2): relativ zur Grain-Hüllkurve; SAT → Fuzz, TAPE → dunkel + Rauschen, BIT → grob; EROSION² × 0,25 pro Lesedurchgang, HEAL 30 s.
- Physik (0.2.4): Schwerkraft so skaliert, dass der längste Wurf ~80 % der Kammer erreicht (GRAVITY = Flugzeit); BOUNCE = Elastizität 0,3–0,9 mit Schwellen relativ zur Wurfgeschwindigkeit; DOSE vervielfacht SWARM bis ×2 (TARGET ALL/SWARM).
