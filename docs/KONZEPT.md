# Runklimpsest – Konzept

Arbeitstitel-Verlauf: Palimpsest → Runpalimpsest → **Runklimpsest**.

## Idee in einem Satz
Grains sind Teilchen, die beim Aufprall Klang erzeugen und dabei ihre eigene Erinnerung abnutzen.

Musikalische Schwerpunkte (Nutzer, 0.2.9): Drums mit SYNC (zusätzliche, „funkige“ Hits), Bass (mehr Bewegung), Gesang (psychedelisch, verspult).

## Bausteine (seit 0.3.0: zwei)
| Baustein | Rolle | Inspiration (nicht kopiert) |
|---|---|---|
| **C – Teilchen-Engine** | Teilchen fallen und springen in der Chamber; Aufprall am Boden löst ein Grain aus. X-Position = Lesestelle im Puffer, Aufprallgeschwindigkeit = Lautstärke. Rhythmus entsteht aus Physik (beschleunigend/abklingend), auf dem Raster geworfen, optional eingerastet (SYNC). Jedes Grain hat Länge (SIZE), Tonhöhe (PITCH, MODE) und Richtung (REVERSE). | Sinevibes Dispersion (Echos wie springender Ball) |
| **A – Palimpsest** | Jedes Lesen verändert die gelesene Stelle im Puffer (Sättigung, Tape, Bit). Oft gelesene Stellen werden dumpf/kaputt; der Schreibkopf überschreibt mit frischem Audio, außer bei FREEZE – dann verfällt der Loop. | Freakshow Mishby (Tape-Abnutzung), Albedo (Freeze-Wolke) |

~~F – Dose~~ (bis 0.2.9): Gedächtnis über die Zeit (RATE, RECOVER, TARGET). In 0.3.0 entfernt – Nutzerbefund: kein musikalischer Einsatzzweck; musikalisch tragen Drums mit SYNC (zusätzliche Hits), Bass (Bewegung), Gesang (psychedelisch, verspult).

Abgrenzung: Zufall+Freeze-Wolken, tempo-synchrone Grain-Sequencer (inkl. euklidischer Trigger, z. B. Celium), Effekte pro Grain und Multiband-Granular gibt es bereits. Eigenständig ist die Kopplung Physik → Lesestelle → Abnutzung der Quelle.

## Parameter (16, alle im Gerät; 0.3.0)
| Parameter | Bereich | Standard | sichtbar |
|---|---|---|---|
| Gravity | 0–1 g | 0 | Gerät + Large View (PHYSICS) |
| Bounce | 0–100 % | 50 % | Gerät + Large View (PHYSICS) |
| Swarm | 1–24 | 4 | Gerät + Large View (PHYSICS) |
| Size | 5–500 ms | 30 ms | Gerät + Large View (GRAIN) – bis 0.2.9 „Grain“ |
| Pitch | −12…+12 st, ganze Halbtöne | 0 | Gerät + Large View (GRAIN) |
| Reverse | 0–100 % | 0 % | Gerät + Large View (GRAIN) |
| Erosion | 0–100 % | 65 % | Gerät + Large View (MEMORY) |
| Mix | 0–100 % | 50 % | Gerät + Large View (OUTPUT) |
| Freeze | aus/an | aus | Gerät + Large View |
| Sync | aus/an | an | Gerät + Large View |
| Division | 1/4, 1/8, 1/16, 1/32 | 1/16 | Gerät + Large View |
| Pitch Mode | FIXED, RANDOM, IMPACT | FIXED | nur Large View (GRAIN) |
| Heal | 0,5–60 s | 40 s | nur Large View (MEMORY) |
| Wear Type | SAT, TAPE, BIT | SAT | nur Large View (MEMORY) |
| Output | −24…+12 dB | 0 dB | nur Large View (OUTPUT) |
| Stereo | STEREO, MONO | STEREO | nur Large View (OUTPUT) |

**Pitch Mode:** FIXED = jedes Grain um PITCH transponiert; RANDOM = jedes Grain zufällig zwischen −PITCH und +PITCH (stufenlos); IMPACT = Hauptschlag voller PITCH, Nachsprünge abgestuft weniger (stufenlos, √ Aufprall/Wurf). Tonhöhe = Lesegeschwindigkeit: höher = kürzer, tiefer = länger (+12: halbe Länge).

**Reverse:** Anteil der Grains, die rückwärts lesen (zufällig je Grain). Rückwärts-Grains nutzen den Puffer ebenfalls rückwärts ab.

**Push:** Bank 1 = die 8 Regler des Geräts, Bank 2 = SYNC, Division, FREEZE, HEAL, Wear Type, Pitch Mode, Output, Stereo.

**Stereo (Startwert):** STEREO verteilt jedes Grain nach seiner X-Position in der Chamber im Panorama, links = links. Abbildung auf **±70 %** (nicht volle Breite: Grains an den Wänden würden sonst hart außen landen), Pan-Gesetz **−3 dB** (Constant Power). MONO: alle Grains in der Mitte. Prüfen im Hörtest (BACKLOG).

„Nur Large View“ heißt: Der Parameter liegt unsichtbar im Gerät (automatisierbar, wird gespeichert), bedienbar ist er im großen Fenster.

## Parameter-Regel
Jede Funktion genau einmal als `live.*`-Parameter im Gerät. Die Large View zeichnet ihre Bedienelemente selbst (jsui) und schickt Änderungen an das Original; das Original meldet zurück. Ergebnis: eine Automationsspur pro Funktion, Undo und Mapping laufen über das Original.

## Oberfläche
- Gerät 634 × 169 px ohne Titelzeile (0.3.0, GUI-Iteration 18): 3 Spalten CHAMBER | MEMORY | CONTROLS (4×2: oben GRAVITY, BOUNCE, SWARM, SIZE = was wird wann wie lange gespielt; unten PITCH, REVERSE, EROSION, MIX = wie klingt das Effektsignal) plus IN/OUT-Meter; eine Kopfzeile, eine Button-Zeile (SYNC + Division, FREEZE, LARGE VIEW). Farbe der Regler = Karte in der Large View. Gezeichnet und bedient von einer jsui; Parameter versteckt.
- Large View 960 × 456 px (0.2.7, GUI-Iteration 13): Kopfzeile (Logo, Legende, Tempo), CHAMBER und MEMORY nebeneinander, gleich groß (je 450 × 200, gleiche X-Skala), Kennzahlen in der MEMORY-Kopfzeile, IN/OUT-Meter in MEMORY; unten vier Karten nach Funktion (0.3.0: PHYSICS · GRAIN · MEMORY · OUTPUT), Inhalte mittig, cyan Punkt = auch im Gerät. Kein CLOSE (Fenster-X). WEAR HISTORY entfiel (doppelt zu MEMORY).
- Anzeigen (0.2.7): MEMORY zeigt die echte Puffer-Übersicht aus gen~ – Schema „Cyan → Orange“: frisches Audio cyan (wie die Chamber), Abnutzung orange (wie MEMORY/EROSION), Kontur der frischen Aufnahme = Palimpsest. Chamber ohne Wellenform, Boden mit Teilstrichen. Alle Kästen im Kartenton (eine Regel). Rückwärts gelesene Grains: magenta Lesekopf „REV“ (0.3.0).
- Stil: Runkelizer FX (Verlauf #23262e → #0a0a0d, Farbe pro Bereich: Cyan Chamber/Physics/Output, Magenta Grain (seit 0.3.0, vorher Dose), Orange Memory/Wear; LED-Buttons; Meter grün → rot). Alle Texte Englisch, keine Bereichs-Hinweise unter den Reglern (Platz).
- GUI-Entwürfe (Iterationen 1–18): Claude-Artifact „Palimpsest M4L GUI“ (privat beim Nutzer).

## Klangverarbeitung (0.2.1)
- gen~-Codebox `device/runklimpsest_dsp.genexpr`, Latenz 0, 32 Grain-Stimmen, Puffer „fresh“ + „worn“ (je stereo, max. 800 000 Samples).
- Aufprall → Ereignis (Position, Stärke, Panorama, Zeitversatz; seit 0.3.0 auch Tonhöhe und Richtung) → Stimme. Hörbares Lesen mit Tonhöhe als Lesegeschwindigkeit (lineare Interpolation), Abnutzung als eigener Durchlauf 1 Sample/Sample in Grain-Richtung. Lesen aus „worn“, Rückschreiben einer abgenutzten Fassung (Palimpsest); HEAL zieht „worn“ zu „fresh“.
- Effektanteil: Mono-Summe je Grain, Pan aus X (±70 %, −3 dB) oder mittig; Dichte-Normalisierung, Pegelangleich an den Eingang, Begrenzer mit Vorlauf, DC-Filter; MIX mit gleicher Leistung; OUTPUT; Schutzbegrenzer.
- Rhythmus (0.2.2): Teilchen werfen auf dem DIVISION-Raster, der Hauptschlag landet ein ganzzahliges Vielfaches später (samplegenau vorgemerkt), Nachsprünge frei; SYNC rastet zusätzlich alle Aufpralle ein.
- Abnutzung (0.2.2): relativ zur Grain-Hüllkurve; SAT → Fuzz, TAPE → dunkel + Rauschen, BIT → grob; EROSION² × 0,25 pro Lesedurchgang (seit 0.2.9: EROSION^1,5 × 0,4, etwa doppelt so stark; 0.3.0 ohne DOSE: EROSION^1,5 × 0,9 = gleiche Abnutzung wie 0.2.9 mit DOSE), HEAL 30 s (seit 0.2.6: 40 s).
- Physik (0.2.4): Schwerkraft so skaliert, dass der längste Wurf ~80 % der Kammer erreicht (GRAVITY = Flugzeit); BOUNCE = Elastizität 0,3–0,9 mit Schwellen relativ zur Wurfgeschwindigkeit.
- Physik (0.2.8): Schwerkraft pro Wurf, jeder Hauptwurf erreicht 55–90 % der Kammer; GRAVITY bestimmt weiter die Flugzeit, Änderungen während des Flugs wirken sofort (schnell herunterdrehen = Teilchen schießen hoch, gewollt).
- Abnutzungs-Fußabdruck (0.2.6): mindestens 80 ms pro Aufprall, unabhängig von GRAIN; Pegelabgleich misst nur, während Grains klingen.
