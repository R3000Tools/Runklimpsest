# Changelog

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
