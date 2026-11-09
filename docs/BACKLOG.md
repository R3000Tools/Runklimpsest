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

## 0.2.8 (umgesetzt) und Nutzernotizen
- [x] (0.2.8) GRAIN-Standard **30 ms** statt 5 ms, auch beim Neuladen (Nutzerentscheidung: über einer Periode von 40-Hz-Bass, noch perkussiv)
- [ ] (später, Nutzer) Info-Tipps auf Englisch für alle Bedienelemente (Gerät und Large View). Weg 1: jsui setzt beim Überfahren ihr `annotation`-Attribut → Text in Lives Info-Ansicht (ungeprüft, ob Live den Wechsel übernimmt). Weg 2: eigener Hinweis in der jsui (`onidle`)
- [x] (0.2.8, umgesetzt wie vorgeschlagen) Würfe nutzen die Höhe zu wenig: Nachsprünge kommen höchstens knapp über die Mitte (Nutzer). Ursache: Wurfhöhe ∝ Flugzeit², kurze Würfe (1–2 Rasterschritte) bleiben flach, BOUNCE 50 % = 36 % der Höhe. Vorschlag: Schwerkraft pro Teilchen so wählen, dass jeder Hauptwurf 55–90 % der Höhe erreicht (Timing bleibt gleich); keine negativen GRAVITY-Werte (Teilchen würden nicht mehr landen = keine Grains)
- [x] (0.2.8: Strich an der Oberkante, Teilchen fallen wieder ein) GRAVITY schnell von hoch auf 0: Teilchen springen kurz höher, teils über die Chamber hinaus (Nutzer: „kinda cute“) – beibehalten, aber Teilchen außerhalb sauber zurückholen (Decke weich oder oben abschneiden und wieder einfallen lassen)
- [x] (0.2.8) **Beschlossen:** MEMORY baut sich schleppend und schrittweise auf (Nutzer). Ursachen: Übersicht tastet 4 Stellen pro Sample ab (2 Takte bei 120 BPM = 1 s pro Durchlauf), jsui liest nur alle 8 Bilder (0,27 s), Anzeige-Verstärkung springt. Vorschlag: Spalte am Schreibkopf live aktualisieren (1 Sample pro Sample), Lesestellen der Stimmen direkt nachführen, Hintergrund-Durchlauf nur für HEAL; jsui jedes 2. Bild lesen; Spalten weich überblenden
- [x] (0.2.8) Aufprall in MEMORY als orange nachglühender Fleck in der Breite des echten Abnutzungs-Fußabdrucks (≥ 80 ms bzw. GRAIN) – Abnutzung auch bei SWARM 1 sofort sichtbar (Nutzer-Screenshot 0.2.7: Orange kaum zu sehen)

## Befunde Live-Test 0.2.8 (Drum-Loop, Aufnahmen des Nutzers)
- [x] (0.2.9) **Fehler:** Eingefrorener Loop wird nach Stopp des Eingangs ca. 20 dB leiser (Live: Effektanteil −31 → −52 dB; Simulation gleich: −52…−54 dB). Ursache: Der Eingangs-Mittelwert der Pegelregelung fällt in der Stille, die Regelung läuft auf ihre Untergrenze (×0,25), bevor das Halten greift. Fix in der Simulation geprüft: Eingangs-Mittelwert nur bei Signal nachführen, Regelung nur bei aktivem Eingang (Spitzenwert > −60 dB, 0,2 s Abfall) – nach Stopp −34…−40 dB statt −52…−59 (MIX 100), kein Pegelsprung beim Wiedereinsetzen
- [x] Simulation gegen Live geprüft: Pegel je Takt ±1 dB, Verhalten nach Eingangsstopp gleich
- [x] Wiederholung mit MIX 100 % (8 Aufnahmen, 16 Takte): Simulation mit demselben Loop trifft Live – mittlerer Pegel ±0,8 dB in allen 8 Fällen, Grain-Dichte je Takt, Crest (11 dB), Grundrauschen (−56 dB) gleich; Stereo in Live etwas breiter (Korrelation 0,76–0,83 statt 0,83–0,86); DOSE SWARM verdoppelt die Teilchen in Live wie simuliert
- [x] (0.2.9: EROSION^1,5 × 0,4, ca. doppelt; Hörtest offen) **Abnutzung auf Drums kaum messbar** (Standard SWARM 4, GRAIN 30 ms, EROSION 65 %, FREEZE ab Takt 3): Spektrum der späten Takte meist innerhalb der Streuung (±2–3 dB) zur Referenz ohne Abnutzung; nur TAPE (−3…−6 dB über 1 kHz) und SAT 100 %/HEAL 60 s (−7 dB über 4 kHz) zeigen eine Richtung. Passt zur Anzeige (MOST WORN niedrig). Entscheidung nach Hörurteil des Nutzers: Abnutzung kräftiger (z. B. EROSION-Kurve, Fußabdruck 80 → 150 ms, HEAL-Standard länger)?
- [ ] Automation von FREEZE in Live: Ergebnis der Prüfung (lief der Transport?) offen

## 0.3.0 – vorgemerkt (Nutzerentscheidung, noch nicht umsetzen)
- [ ] DOSE entfällt komplett (RATE, RECOVER, TARGET, RESET, Ring, Schimmer, Engine-Teil); CHANGELOG-Hinweis: Automation dieser Parameter geht in alten Sets verloren
- [ ] Neue Parameter: PITCH −12…+12 st (Standard 0, Bogen von der Mitte), REVERSE 0–100 % (Standard 0 %), PITCH MODE FIXED / RANDOM / IMPACT → 16 Parameter
- [ ] Gerät 634 × 169 (Nutzerentscheidung, GUI-Iteration 17): CONTROLS 4 × 2 – oben GRAVITY · BOUNCE · SWARM · GRAIN, unten PITCH · REVERSE · EROSION · MIX (+ SYNC/Teilung, FREEZE, LARGE VIEW); Chamber und MEMORY unverändert; offen: Farbe nach Karte (A) oder nach Reihe (B)
- [ ] Large View: Karten PHYSICS (GRAVITY, BOUNCE, SWARM, SYNC/Teilung) · GRAIN (GRAIN, PITCH, REVERSE, MODE) · MEMORY (EROSION, HEAL, FREEZE, SAT/TAPE/BIT) · OUTPUT (MIX, OUTPUT, STEREO/MONO); Farben: PHYSICS cyan, GRAIN magenta, MEMORY orange, OUTPUT cyan
- [ ] MEMORY: rückwärts gelesene Grains als magenta Lesekopf „REV“
- [ ] Push: Bank 1 = 8 Regler des Geräts; Bank 2 = SYNC, Teilung, FREEZE, HEAL, Abnutzungstyp, PITCH MODE, OUTPUT, STEREO (16 Parameter = 2 volle Bänke)
- [ ] Regel: Ist EROSION nach Hörtest 0.2.9 trotz FREEZE zu schwach → im Gerät gegen PITCH tauschen oder OVERWRITE ergänzen

## Konzept 0.3 – offen (Nutzer nach 0.2.8: „simpler, das Gute fett machen“)
- Nutzerbefund: musikalisch gut sind Drums mit SYNC (zusätzliche Hits, „funkiger“), Bass (mehr Bewegung), Gesang (psychedelisch, verspult); DOSE ohne erkennbaren Einsatzzweck, Abnutzung kaum hörbar (vor 0.2.9)
- Vorschlag: DOSE streichen (RATE, RECOVER, TARGET, RESET: 17 → 13 Parameter); Palimpsest hörbar machen durch OVERWRITE (Grains werden in den Puffer zurückgeschrieben, Rückkopplung mit Begrenzung) statt nur feiner Abnutzung; höchstens 1–2 neue Regler für die drei Anwendungsfälle (z. B. PITCH je Grain, REVERSE-Anteil)
- Entscheidung nach Hörtest 0.2.9 (stärkere EROSION); Name Runklimpsest bleibt, solange das Überschreiben/Abnutzen des Puffers hörbar ist

## Klang (seit 0.2.1)
- [x] 0.2.6 Standardwerte PHYSICS (Nutzer): GRAVITY 0, BOUNCE 50 %, SWARM 4, GRAIN 5,0 ms
- [x] 0.2.6 Standardwerte MEMORY / DOSE: EROSION 65 %, HEAL 40 s, SAT, TARGET WEAR, RATE 8, RECOVER 16
- [ ] Hörtest 0.2.6: Standardwerte (sparsame 5-ms-Klicks), Pegel bei MIX 100 % (ca. −12 dB mittlere Lautheit), Abnutzung bei FREEZE
- [x] 0.2.5: Standardwerte beim Laden und Werte im gespeicherten Set bestätigt (Nutzer)
- [ ] Hörtest 0.2.4: Chamber-Höhe, BOUNCE (Einzelschlag ↔ Ketten), DOSE × SWARM, neue Standardwerte
- [ ] Feinabstimmung der Standardwerte (Nutzer: später)
- [ ] Hörtest 0.2.2: Abnutzung auf Flächen (SAT/TAPE/BIT, 30/55/80 %), Rhythmus ohne SYNC, TAPE-Pegel bei FREEZE (−3,5 dB in Simulation) – Gesang und Bass ok (Nutzer)
- [x] DOSE vervielfacht SWARM statt +10 Teilchen, Anzeige „1 → 2“ (0.2.4)
- [ ] Kurzanleitung (Physics, Memory, Dose, Output) in `device/LIESMICH.md` übernehmen
- [ ] Large View skalierbar machen (Inhalt mit Fenstergröße zoomen) – optional, 0.2.3 hat feste Größe
- [ ] Prüfen: wartende (vorgemerkte) Hauptschläge belegen Stimmen – bei SWARM 24 + hoher Dosis Stimmenmangel möglich; ggf. eigene Warteschlange in gen~
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
- [x] Anzeige der Abnutzung aus der echten DSP (Puffer-Differenz) statt aus dem JS-Modell (0.2.7, in Live bestätigt: gerätelokaler Buffer-Name per `[prepend ovname ---rkov]` funktioniert)
- [ ] Hörtest-Fix Bass/Drums seit 0.2.6 („Bass seltsam, Drums waren besser“): Tests A (GRAIN 80 ms, EROSION 65 %), B (5 ms, 0 %), C (80 ms, 0 %) vom Nutzer abwarten; Kandidaten: Mindest-Grainlänge, Wear-Fußabdruck an GRAIN koppeln
- [ ] Test 0.2.7 in Live: echte Wellenform sichtbar? CPU mit offener Large View (MEMORY zeichnet ~256 Spalten + Schraffur); ggf. MEMORY nur alle 2 Bilder neu zeichnen
- [ ] Optional: Gerät – Schraffur im kleinen MEMORY prüfen (evtl. nur Tönung)

## Später
- [ ] Euklidische Muster als Alternative zum festen Raster (Brücke zu Runklidian)
