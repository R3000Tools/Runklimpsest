# Changelog

## 0.2.1 – Klangverarbeitung
Erste Version mit Audio. DSP als gen~-Codebox (`device/runklimpsest_dsp.genexpr`), Latenz 0 Samples.
- **Grains aus Teilchen:** Jeder Aufprall in der Chamber startet ein Grain (bis 32 Stimmen). X-Position = Lesestelle im Puffer (2 Takte im Song-Tempo), Aufprallstärke = Lautstärke (0,25–1, Ballsprung-Abklingen hörbar). Zeitpunkt innerhalb des 30-fps-Bildes wird mitgegeben (samplegenau statt 33-ms-Raster). SYNC: wartende Grains feuern direkt beim Raster-Tick (vorher bis 33 ms zu spät).
- **GRAIN:** Länge 5–500 ms (±8 % Zufall gegen Kammfilter), Tukey-Fenster (25 % Flanken): kurze Grains klicken nicht, lange behalten ihren Körper.
- **Palimpsest (EROSION, WEAR TYPE):** Jedes Lesen schreibt eine abgenutzte Fassung zurück in den Puffer – die Quelle verändert sich durch Benutzung. Stärke pro Lesedurchgang = EROSION² × 0,18, DOSE erhöht bis +150 % (TARGET ALL/WEAR). SAT = Sättigung (tanh, leise Signale unverändert), TAPE = Generationsverlust (Tiefpass 4,5 kHz, Sättigung, leises Rauschen), BIT = Sample-and-Hold /3 + 6 Bit.
- **HEAL:** zieht den abgenutzten Puffer mit der eingestellten Zeitkonstante zum Original zurück. **FREEZE:** Schreibkopf stoppt, Abnutzung wirkt weiter.
- **STEREO | MONO:** Grains nach X-Position im Panorama (±70 %, −3 dB Constant Power) bzw. mittig.
- **Pegel:** Effektanteil automatisch auf die Lautheit des Eingangs (±12 dB, bei FREEZE/Stille gehalten), Dichte-Normalisierung, Begrenzer mit 1,3 ms Vorlauf auf dem Effektanteil (−2 dBFS), DC-Filter. MIX mit gleicher Leistung (equal power), Standard jetzt 50 %. OUTPUT −24…+12 dB. Schutzbegrenzer ab −0,9 dBFS.
- Meter OUT zeigen jetzt den echten Ausgang.
- Tests: `tests/genexpr.js` übersetzt die ausgelieferte Codebox nach JavaScript, `tests/audio_sim.js` rendert echte Teilchen-Engine + echte DSP (Messwerte, Hörbeispiele).
- Vom Nutzer in Live bestätigt: Gerät lädt ohne Fehler (gen~-Codebox kompiliert), Grains hörbar (MIX 100 % = nur Grains), CPU: Runkelizer + 808-Core-Drum-Rack + Runklimpsest zusammen 4 %, Drums mit SYNC klingen gut. Anderes Material noch offen.
- Simulation (synthetisches Material, −3 dBFS): Lautheit ±1 dB zum Original (sehr kurze Grains −3 dB), Spitzen ≤ −1,4 dBFS, keine Klicks über Eingangsniveau, Abnutzung nach 12 s eingefrorenem Loop bei EROSION 80 %: SAT 41 %, TAPE 20 %, BIT 16 %.

## 0.2.0 – Meilenstein „UI complete“
Festgehaltener Stand vor Beginn der Klangverarbeitung (ab 0.3.0). Funktion identisch mit 0.1.13, vom Nutzer in Live getestet.
- Gerät (580 × 169 px): Chamber mit Teilchen-Physik und SYNC-Raster (Song-Tempo), Memory mit Abnutzungsanzeige und FREEZE, 3×2-Regler-Block (Gravity, Bounce, Swarm, Erosion, Dose, Mix), Button-Zeile (SYNC, Division-Liste, FREEZE, LARGE VIEW), IN/OUT-Meter. Eine jsui zeichnet und bedient alles.
- Large View: große Chamber, Memory, Wear History, Kennzahlen; vier Karten PHYSICS, MEMORY, DOSE, OUTPUT (inkl. STEREO | MONO).
- 17 Parameter, alle automatisierbar; Push-Bänke „Main“, „Detail“, „Reset“. MIDI-Map per Klick auf die gezeichneten Regler ist bauartbedingt nicht möglich (Befund 0.1.11).
- Noch keine Klangverarbeitung: Audio läuft unverändert durch; DOSE und Pufferanzeige reagieren auf den Eingangspegel.

## 0.1.13
- Neues Layout (GUI-Iteration 8, vom Nutzer freigegeben):
  - Gerät: Raster aus 3 Spalten (CHAMBER | MEMORY | CONTROLS) plus Meter, eine Kopfzeile, eine Button-Zeile unten. Die 6 Regler als 3×2-Block (GRAVITY, BOUNCE, SWARM / EROSION, DOSE, MIX). SYNC + Division unter der Chamber, FREEZE unter Memory, LARGE VIEW (bisher MORE) unter den Reglern. Division-Liste öffnet nach oben.
  - Large View: ohne „LARGE VIEW“-Beschriftung und CLOSE (Fenstertitel und Windows-X), Kopfzeile mit Logo, Legende „ALSO ON DEVICE“ und Tempo. Unten vier Karten nach Funktion (PHYSICS, MEMORY, DOSE, OUTPUT) statt LINKED/DETAIL, Inhalte mittig; cyan Punkt am Namen = auch im Gerät.
- Neuer Parameter „Stereo“ (STEREO | MONO, Standard STEREO), nur in der Large View (OUTPUT). Wirkt ab der Klangverarbeitung: STEREO verteilt Grains nach ihrer X-Position (Startwert ±70 %, −3 dB).
- Push-Bänke: „Main“ (8), „Detail“ (Grain, Heal, Dose Rate, Dose Recover, Output, Wear Type, Dose Target, Stereo), „Reset“ (Dose Reset).

## 0.1.12
- Zurück zum Verhalten von 0.1.10: die gezeichnete Oberfläche wertet alle Klicks selbst aus (Knobs mit Doppelklick = Standardwert, eigene Division-Liste), alle 16 Parameter versteckt. Automation und Push-Bänke wie gehabt.
- Ergebnis des Tests 0.1.11 (Nutzer): Buttons und Division-Menü als Live-Objekte bedienbar, aber Knobs (`live.numbox`) nicht ziehbar, Division-Schrift unsichtbar, Strg+M auch an SYNC/FREEZE/Division nicht möglich. Befund: In Live wird die jsui über allen anderen Objekten gezeichnet (unabhängig von der Reihenfolge im Patch) und lässt mit `ignoreclick` nur Klicks durch, kein Ziehen. MIDI-Map per Klick an der gezeichneten Oberfläche ist damit ohne sichtbare Live-Objekte nicht machbar.

## 0.1.11 (Testversion)
- Versuch: MIDI-Map per Klick (Strg+M), Rechtsklick-Menü und Makro-Zuweisung direkt an den gezeichneten Reglern, ohne sichtbare Änderung. Aufbau wie 0.1.5 (Zeichen-jsui lässt Klicks durch, `live.text` darüber funktionierte dort), aber:
  - Knobs: transparente `live.numbox` statt `live.dial` (Ziehen hoch/runter; Doppelklick öffnet Zahleneingabe)
  - Notenwert: `live.menu` mit sichtbarer Schrift → normale Live-Auswahlliste
  - SYNC, FREEZE, MORE, DOSE-Reset: transparente `live.text` wie in 0.1.5
- Generator-Schalter `OVERLAY_CONTROLS`: `False` stellt 0.1.10 wieder her (falls der Versuch scheitert).

## 0.1.10
- Zuweisungsleiste aus 0.1.9 wieder entfernt (Nutzer: kein zusätzlicher GUI-Bereich). Gerät wieder 580 px, Oberfläche wie 0.1.8.
- Bleibt (intern, ohne GUI): Parameter-Bänke „Main“/„Detail“ für Push und Controller mit Geräte-Steuerung. Automation aller 16 Parameter über die Automationsauswahl der Spur und Aufnahme von Regler-Bewegungen wie bisher.
- Offen: MIDI-Map per Klick auf die gezeichneten Regler (Strg+M) – geht nur mit Live-Objekten an der Klickstelle (siehe BACKLOG).

## 0.1.9
- Zuweisung per MIDI-Map und Push: Neue Zuweisungsleiste rechts neben der gezeichneten Oberfläche (keine Überlappung). Alle 16 Parameter sind dort als kleine sichtbare Live-Felder (`live.numbox`, Reset als Button) – sie *sind* die Parameter: Strg+M bzw. Makro-Zuweisung per Klick, Automation, Rechtsklick-Menü. Gerät und Large View folgen ihnen.
- Parameter-Bänke für Push und andere Controller: Bank 1 „Main“ (Gravity, Bounce, Swarm, Erosion, Mix, Freeze, Sync, Division), Bank 2 „Detail“ (Grain, Heal, Dose Rate, Dose Recover, Output, Wear Type, Dose Target, Dose Reset). Die Leiste ist genauso in zwei Spalten geordnet.
- Gerät 790 statt 580 px breit.
- Parameter-Objekte sind jetzt `live.numbox` statt versteckter `live.dial`/`live.text`/`live.menu`/`live.tab`; Langnamen unverändert.

## 0.1.8
- Notenwert im Gerät: Klick öffnet eine Auswahlliste mit allen vier Werten (1/4, 1/8, 1/16, 1/32, aktueller Wert hervorgehoben), Klick auf einen Eintrag wählt ihn, Klick daneben schließt die Liste. Bisher schaltete jeder Klick nur zum nächsten Wert (Nutzerbefund 0.1.7: Optionen nicht sichtbar).
- Vom Nutzer in Live bestätigt (0.1.7): Knobs und Buttons im Gerät bedienbar.

## 0.1.7
- Fix: In 0.1.6 waren die Knobs und der Notenwert im Gerät unsichtbar (Nutzerbefund mit Screenshot): Objekte, die in Live über der großen Zeichen-jsui liegen, werden verdeckt bzw. bekommen keine Klicks (0.1.3–0.1.6 vier Varianten, alle gescheitert).
- Neu: Das Gerät besteht aus **einer** jsui, die alles zeichnet und alle Klicks selbst auswertet (Knobs ziehen/Shift/Doppelklick, SYNC, Notenwert Klick/Shift-Klick, FREEZE, MORE, DOSE-Reset) – dasselbe Prinzip wie die Large View, die in Live funktioniert. Alle 16 Parameter liegen versteckt im Gerät.
- Pegelanzeigen IN/OUT zeichnet die jsui selbst (live.meter~ war verdeckt).
- DOSE-Reset (Ring in Gerät und Large View, Button RESET DOSE) blinkt kurz als Rückmeldung.
- Einschränkung: Im MIDI-Map-Modus lassen sich die Regler des Geräts nicht per Klick zuweisen (versteckte Parameter).

## 0.1.6
- Fix: Knobs im Gerät ließen sich nicht bedienen (0.1.5, Nutzerbefund: transparente `live.dial` nehmen in Live keine Klicks an). Jeder Geräte-Knob ist jetzt eine eigene kleine jsui (Modus `knob`), die Ziehen (Shift = fein) und Doppelklick (Standardwert) selbst annimmt und den Wert an den versteckten Parameter schickt – wie in der Large View.
- Fix: Notenwert-Auswahl im Gerät zeigte im Popup nur den aktuellen Eintrag (übrige schwarz, weil das Popup die transparente Textfarbe übernahm). Jetzt jsui (Modus `menu`): Klick = nächster Wert, Shift-Klick = vorheriger.
- SYNC, FREEZE, MORE und DOSE-Reset bleiben transparente Live-Buttons (funktionieren in Live).
- Large View: DOSE-Ring in der Zeile LINKED (Anzeige, Klick = Reset).

## 0.1.5
- Fix: In 0.1.4 war die Oberfläche unsichtbar (Nutzerbefund) – die Hintergrundfläche (panel) verdeckte die Zeichen-jsui im Hintergrund-Layer. Panel entfernt (die jsui zeichnet den Hintergrund selbst), jsui nicht mehr im Hintergrund-Layer, sondern unterstes Objekt mit `ignoreclick 1`.
- Restliche sichtbare Umrisse der transparenten Parameter (Regler-Ringe, Menürahmen) ebenfalls transparent.

## 0.1.4
- Fix: In 0.1.3 ließ sich im Gerät nichts bedienen (Nutzerbefund). Vermutete Ursache: die ganzflächige Zeichen-jsui fing die Klicks ab. Jetzt: jsui im Hintergrund-Layer mit `ignoreclick 1`; die transparenten Parameter-Objekte haben 1 % statt 0 % Deckkraft (falls völlig transparente Objekte nicht angeklickt werden können).
- Fix: Die Nachricht `grain <ms>` rief die gleichnamige Engine-Funktion auf, statt den Parameter zu setzen (Funktion heißt jetzt `fireGrain`). Smoke-Test prüft jetzt alle 16 Parameter-Nachrichten.
- DOSE-Reset per Klick auf den Ring läuft jetzt über den Parameter „Dose Reset“ (transparent über dem Ring) – damit auch per MIDI mappbar.
- Diagnose: jede Parameteränderung erscheint im Max-Fenster als `Runklimpsest-param` (wird nach Bestätigung entfernt).

## 0.1.3
- Eine Regler-Ansicht für alles: Das Gerät wird komplett von der jsui `device` gezeichnet (gleiche Knobs, LED-Buttons und Segmente wie in der Large View). Die 16 Live-Parameter liegen unsichtbar darüber – Ziehen, Rechtsklick, MIDI-/Key-Mapping und Automation bleiben Live-eigen.
- Titelzeile im Gerät entfernt (der Name steht in Lives Gerätetitelzeile): Chamber höher (145 statt 124 px), mehr Platz für die Regler.
- Tempo und Taktart kommen vom Song (`live.observer`): Pufferlänge 2 Takte, DOSE Rate/Recover in Takten, Ersatztakt bei gestopptem Transport.
- Kurznamen der Parameter in Großbuchstaben (GRAVITY, BOUNCE …); Langnamen unverändert, bestehende Automation bleibt erhalten.
- Zähltext der Chamber oben rechts.
- Large View: Fenstertitel „Runklimpsest - Large View“, Tempo und Taktart in der MEMORY-Zeile.
- Generator schreibt Parameter-Tabelle, Layout und Version in die JS-Datei (keine doppelte Pflege mehr).
- Debug-Ausgabe `Runklimpsest-open` entfernt.

## 0.1.2
- Large View: Bedienelemente selbst gezeichnet (jsui `controls`) statt Live-Spiegeln – Namen, Werte, WEAR TYPE, DOSE TARGET und Notenwerte jetzt sichtbar; SYNC/FREEZE zeigen ihren Zustand. Ziehen = ändern, Shift = fein, Doppelklick = Standardwert.
- Large View enthält keine Parameter mehr; alle Änderungen gehen an die 16 Parameter im Gerät.
- Gerät: „+“-Button entfernt (doppelt zu MORE), Notenwert-Menü breiter.
- Vom Nutzer in Live bestätigt: Laden, eine Automationsspur pro Funktion, Synchronität in beide Richtungen, Automation der DETAIL-Werte.

## 0.1.1
- MORE öffnet die Large View: Button-Ausgabe über `[t b]` statt `[sel 1]`, zusätzlich Öffnen über `front` an `[thispatcher]`.
- Debug-Ausgabe `Runklimpsest-open` im Max-Fenster.

## 0.1.0
- Erster Oberflächen-Prototyp (ohne Klangverarbeitung): Chamber mit Teilchen-Physik, SYNC mit Notenwert, Memory mit Abnutzung und FREEZE, DOSE mit Reset per Klick auf den Ring, Large View mit Wear History.
- 16 Parameter: Gravity, Bounce, Swarm, Erosion, Mix, Grain, Heal, Dose Rate, Dose Recover, Output, Freeze, Sync, Division, Wear Type, Dose Target, Dose Reset.
