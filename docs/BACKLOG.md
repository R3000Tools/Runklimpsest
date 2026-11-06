# Backlog

## Oberfläche (0.1.x)
- [x] Tempo vom Song statt fester 120 BPM (Pufferlänge 2 Takte, DOSE Rate/Recover in Takten)
- [x] Kurznamen der Geräte-Regler in Großbuchstaben (einheitlich mit Large View) – ändert die Anzeige in der Automationsliste
- [x] Zähltext in der Chamber nicht von Teilchen überdecken (über den Boden oder rechts oben)
- [ ] Leerer Puffer, wenn FREEZE beim Laden an ist – Hinweis anzeigen oder FREEZE erst nach erstem Füllen wirken lassen
- [ ] CPU mit 3–4 Instanzen prüfen (4 jsui-Ansichten à 30 fps); ggf. Bildrate senken, Chamber pausieren, solange Large View offen ist
- [ ] Rechtsklick auf Regler in der Large View → Parameter im Gerät für Mapping/Automation markieren (optional)
- [x] Debug-Ausgabe `Runklimpsest-open` wieder entfernen
- [ ] Gerät vor Weitergabe einfrieren (Freeze), damit die JS-Datei eingebettet ist
- [ ] Später prüfen: `v8ui` statt `jsui` (schneller, modernes JavaScript), wenn Max 9 in Live sicher vorhanden ist

- [x] Eine Regler-Ansicht für Gerät und Large View (0.1.3: jsui zeichnet, transparente Live-Parameter darüber)
- [x] Prüfen in Live: transparente Parameter-Objekte (0.1.5: Buttons gehen, Dials nicht, Menü-Popup schwarz → 0.1.6 Knobs/Menü als jsui)
- [x] MIDI-Map-Modus (0.1.9: Zuweisungsleiste neben der jsui, Push-Bänke) – vorher: Regler im Gerät ließen sich nicht per Klick zuweisen (alle Parameter versteckt, Stapeln von Objekten geht in Live nicht, 0.1.3–0.1.6). Mögliche Lösung: kleine sichtbare `live.*`-Felder neben (nicht über) der jsui, z. B. eine Zuweisungsleiste, oder Mapping per Push/Macro dokumentieren
- [ ] Weitere Anmerkungen des Nutzers zu 0.1.2 (angekündigt)
- [ ] Diagnose `print Runklimpsest-param` entfernen, sobald 0.1.4 bestätigt ist

- [ ] Zuweisungsleiste: Hintergrund folgt Lives Theme (nicht dem dunklen Verlauf) – prüfen, ob störend
- [ ] Prüfen, ob Push die Bank-Namen „Main“/„Detail“ übernimmt (Format von `parameterbanks` ungeprüft)

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
