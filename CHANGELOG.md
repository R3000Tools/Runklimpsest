# Changelog

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
