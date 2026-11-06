# Backlog

## Oberfläche (0.1.x)
- [ ] Tempo vom Song statt fester 120 BPM (Pufferlänge 2 Takte, DOSE Rate/Recover in Takten)
- [ ] Kurznamen der Geräte-Regler in Großbuchstaben (einheitlich mit Large View) – ändert die Anzeige in der Automationsliste
- [ ] Zähltext in der Chamber nicht von Teilchen überdecken (über den Boden oder rechts oben)
- [ ] Leerer Puffer, wenn FREEZE beim Laden an ist – Hinweis anzeigen oder FREEZE erst nach erstem Füllen wirken lassen
- [ ] CPU mit 3–4 Instanzen prüfen (4 jsui-Ansichten à 30 fps); ggf. Bildrate senken, Chamber pausieren, solange Large View offen ist
- [ ] Rechtsklick auf Regler in der Large View → Parameter im Gerät für Mapping/Automation markieren (optional)
- [ ] Debug-Ausgabe `Runklimpsest-open` wieder entfernen
- [ ] Gerät vor Weitergabe einfrieren (Freeze), damit die JS-Datei eingebettet ist
- [ ] Später prüfen: `v8ui` statt `jsui` (schneller, modernes JavaScript), wenn Max 9 in Live sicher vorhanden ist

## Klang (0.2.0 ff.)
- [ ] Klang-Zielbilder vorab festlegen (wie klingen Gravity, Bounce, Erosion 30 %/80 %, Dose hoch) – Maßstab für jede Klangänderung
- [ ] Echter Puffer (2 Takte), Schreibkopf, FREEZE
- [ ] Grain-Wiedergabe beim Aufprall: Lesestelle = X, Lautstärke/Tonhöhe aus Aufprallgeschwindigkeit, Länge = GRAIN
- [ ] Abnutzung (Palimpsest): Lesen verändert die gelesene Stelle – SAT, TAPE, BIT; HEAL
- [ ] MIX, OUTPUT wirksam
- [ ] DOSE moduliert SWARM/WEAR (TARGET)
- [ ] Entscheidung: Puffer-Inhalt im Set speichern oder beim Laden leer?

## Später
- [ ] Euklidische Muster als Alternative zum festen Raster (Brücke zu Runklidian)
