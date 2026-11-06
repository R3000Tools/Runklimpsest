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
| Mix | 0–100 % | 100 % | Gerät + Large View |
| Freeze | aus/an | aus | Gerät + Large View |
| Sync | aus/an | an | Gerät + Large View |
| Division | 1/4, 1/8, 1/16, 1/32 | 1/16 | Gerät + Large View |
| Grain | 5–500 ms | 80 ms | nur Large View |
| Heal | 0,5–60 s | 8 s | nur Large View |
| Dose Rate | 1–32 Takte | 4 | nur Large View |
| Dose Recover | 1–64 Takte | 12 | nur Large View |
| Output | −24…+12 dB | 0 dB | nur Large View |
| Wear Type | SAT, TAPE, BIT | SAT | nur Large View |
| Dose Target | ALL, SWARM, WEAR | ALL | nur Large View |
| Dose Reset | Taster | – | DOSE-Ring (Klick), Large View |

„Nur Large View“ heißt: Der Parameter liegt unsichtbar im Gerät (automatisierbar, wird gespeichert), bedienbar ist er im großen Fenster.

## Parameter-Regel
Jede Funktion genau einmal als `live.*`-Parameter im Gerät. Die Large View zeichnet ihre Bedienelemente selbst (jsui) und schickt Änderungen an das Original; das Original meldet zurück. Ergebnis: eine Automationsspur pro Funktion, Undo und Mapping laufen über das Original.

## Oberfläche
- Gerät 580 × 169 px: CHAMBER (SYNC, Division), MEMORY (FREEZE, EROSION), PHYSICS (GRAVITY, BOUNCE, SWARM, DOSE, MIX, MORE), IN/OUT-Meter.
- Large View 960 × 620 px: große Chamber mit Spuren und Verschleiß-Streifen, MEMORY, WEAR HISTORY (Verschleiß über die Zeit), Kennzahlen; Zeile LINKED (wie im Gerät) und DETAIL (nur hier).
- Stil: Runkelizer FX (Verlauf #23262e → #0a0a0d, Farbe pro Bereich: Cyan Chamber/Physics, Orange Memory/Wear, Magenta Dose; LED-Buttons; Meter grün → rot). Alle Texte Englisch, keine Bereichs-Hinweise unter den Reglern (Platz).
- GUI-Entwürfe (Iterationen 1–4): Claude-Artifact „Palimpsest M4L GUI“ (privat beim Nutzer).
