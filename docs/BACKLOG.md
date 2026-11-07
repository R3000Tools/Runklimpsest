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
- [x] ~~MIDI-Map per Klick auf die gezeichneten Regler (Strg+M)~~ – nicht machbar ohne sichtbare Live-Objekte (Test 0.1.11, Befund in CLAUDE.md); Zuweisung über Automation und Push-Bänke
- [ ] Weitere Anmerkungen des Nutzers zu 0.1.2 (angekündigt)
- [ ] Diagnose `print Runklimpsest-param` entfernen, sobald 0.1.4 bestätigt ist

- [ ] Prüfen, ob Push die Bank-Namen „Main“/„Detail“ übernimmt (Format von `parameterbanks` ungeprüft)

## Klang (seit 0.2.1)
- [ ] Hörtest STEREO: Startwert ±70 % und Pan-Gesetz −3 dB auf Kopfhörern und Lautsprechern prüfen, Mono-Summe prüfen; danach entscheiden, ob STEREO | MONO zu einem WIDTH-Regler (0–100 %, Standard 70 %) wird
- [ ] Klang-Zielbilder vorab festlegen (wie klingen Gravity, Bounce, Erosion 30 %/80 %, Dose hoch) – Maßstab für jede Klangänderung
- [x] Echter Puffer (2 Takte), Schreibkopf, FREEZE
- [x] Grain-Wiedergabe beim Aufprall: Lesestelle = X, Lautstärke/Tonhöhe aus Aufprallgeschwindigkeit, Länge = GRAIN
- [x] Abnutzung (Palimpsest): Lesen verändert die gelesene Stelle – SAT, TAPE, BIT; HEAL
- [x] MIX, OUTPUT wirksam
- [x] DOSE moduliert SWARM/WEAR (TARGET)
- [ ] Entscheidung: Puffer-Inhalt im Set speichern oder beim Laden leer? (0.2.1: beim Laden leer)
- [ ] Hörtest 0.2.1 in Live: Drums mit SYNC ok; offen: anderes Material (Gesang, Flächen, Bass, Gitarre), GRAIN kurz/lang, SAT/TAPE/BIT bei FREEZE, SYNC aus, STEREO/MONO, Pegel MIX 50/100 %
- [x] CPU in Live (0.2.1): Runkelizer + 808 Core Drum Rack + Runklimpsest zusammen 4 % – mehrere Instanzen noch offen
- [x] gen~ Buffer-Zuordnung `@ev ---rkev` funktioniert (0.2.1: Grains hörbar)
- [ ] Optional: Tonhöhe pro Aufprall (z. B. ±Halbton aus Aufprallstärke), Rückwärts-Grains, Puffer-Inhalt im Set speichern
- [ ] Anzeige der Abnutzung aus der echten DSP (Puffer-Differenz) statt aus dem JS-Modell

## Später
- [ ] Euklidische Muster als Alternative zum festen Raster (Brücke zu Runklidian)
