# kfz_lor_planungsraum.geojson

* Beschreibung: LOR-Planungsräume (Polygone) mit Quote zugelassener Kfz und Pkw
* Bezugsraum: Berlin
* Quelle: nach © Amt für Statistik Berlin-Brandenburg, Potsdam, 2020: „Melderechtlich registrierte Einwohnerinnen
  und Einwohner am Ort der Hauptwohnung in Berlin am 30.06.2020 nach Planungsräumen und KfZ-Bestand“ –
  Vervielfältigung und Verbreitung, auch auszugsweise, mit Quellenangabe gestattet

|Attribut | Erläuterung |
|---|---|
|Schlüssel | Schlüsselnummer des LOR-Planungsraums |
|Bezirk | Bezirk, dem der Planungsraum zugehört
|Planungsraum | Name des Planungsraums|
|Bezirksregion | LOR-Bezirksregion, der der Planungsraum zugehört|
|Prognoseraum | LOR-Prognoseraum, dem der Planungsraum zugehört|
|Flächengröße in m² | Fläche des Planungsraums|
|Einwohner insgesamt | Bevölkerungszahl im Planungsraum|
|darunter 18 Jahre und älter | Anzahl volljähriger Einwohnerinnen und Einwohner|
|Kraftfahrzeuge insgesamt | Anzahl zugelassener Kfz im Planungsraum|
|darunter Pkw | Anzahl zugelassener Pkw im Planungsraum|
|Kfz pro 1000 EW | Kfz-Quote im Planungsraum (abgerundet, so aus Originalquelle übernommen)|
|Pkw pro 1000 EW | Pkw-Quote im Planungsraum (abgerundet, so aus Originalquelle übernommen)|

# kfz_points.geojson

* Beschreibung: Punktwolke zugelassener Kraftfahrzeuge (interpoliert)
* Bezugsraum: Berliner Ortsteil Neukölln und Puffer von 500m außerhalb der Ortsteilgrenze
* Quelle: Berechnet auf Grundlage von © Amt für Statistik Berlin-Brandenburg, Potsdam, 2020 (siehe unten)

|Attribut | Erläuterung |
|--|--|
|id | Eindeutige Referenznummer|
|Bezirk | Bezirk, in dem sich der Punkt befindet|
|Planungsraum | LOR-Planungsraum, in dem sich der Punkt befindet|

# parking_area.geojson

* Beschreibung: Stellplatzflächen (Polygone) abseits des Straßenraums
* Bezugsraum: Berliner Ortsteil Neukölln und Puffer von 500m außerhalb der Ortsteilgrenze
* Quelle: © OpenStreetMap und Mitwirkende, OpenData gemäß ODbL, eigene Ergänzungen

|Attribut | Erläuterung |
|---|---|
|id | Eindeutige Referenznummer|
|osm_id | OSM-Objektreferenz (fehlt bei Tiefgaragen, die aus anderer Datenquelle übernommen wurden)|
|parking | Stellplatztyp (entsprechend des OSM-„parking“-Keys, außer dem Wert „level“ für Parkdecks in Gebäuden, für die es keine etablierte Entsprechung im OSM-Schema gibt)|
|capacity | Stellplatzanzahl|
|access | Zugangsbeschränkung (entsprechend des OSM-„access“-Keys)|
|building | Spezifikation, wenn Stellplatzobjekt ein Gebäude oder Gebäudeteil ist|
|status | „disused“ für ungenutzte/leerstehende Objekte|
|fee | „yes“ für gebührenpflichtige Objekte|
|maxstay | Höchstparkdauer|
|parking:level | Anzahl Stockwerke bei mehrstöckigen Stellplatzobjekten|
|area | Flächeninhalt (Grundfläche der Objektgeometrie) in Quadratmetern|
|area:levels | Geschossflächenzahl (Grundfläche * Anzahl Stockwerke) in Quadratmetern|
|source | Quelle der Geometrie:<br>- „OSM“: Aus OSM übernommen,<br>- „ALKIS“: Aus ALKIS übernommen,<br>- „document“: Aus einem Dokument (z.B. Planwerk) übernommen,<br>- „estimated“: Auf Grundlage baulicher Merkmale geschätzt,<br>- survey: Vor-Ort-Beobachtung.|
|source:capacity | Quelle der Stellplatzanzahl:<br>- „aerial imagery“: Gezählt auf Luftbild,<br>- „document“: Angabe aus Planwerk o.ä.,<br>- „estimated“: Aus Geometrie interpoliert,<br>- „OSM“: Aus OSM übernommen,<br>- „request“: Anfrage bei Eigentümer/(Ver-)Mieter,<br>- „survey“: Vor-Ort-Beobachtung,<br>- „syntax“: Aus Attribut abgeleitet („parking=garage“ entspricht einem Stellplatz).|

# street_parking_lines.geojson

* Beschreibung: Parkstreifen (Linien) im Straßenraum/am Straßenrand
* Bezugsraum: Berliner Ortsteil Neukölln und Puffer von 500m außerhalb der Ortsteilgrenze
* Quelle: © OpenStreetMap und Mitwirkende, OpenData gemäß ODbL

|Attribut | Erläuterung |
|---|---|
|id | Eindeutige Referenznummer, gebildet als Produkt aus x- und y-Koordinate im original verwendeten Referenzsystem ETRS89 / UTM zone 33N (EPSG:25833)|
|osm_id | OSM-Objektreferenz|
|highway | Straßenkategorie
|highway:name | Straßenname
|highway:oneway | „yes“ wenn die anliegende Straße eine Einbahnstraße ist
|parking | Lage des Parkstreifens im Straßenraum:<br>„lane“: auf der Fahrbahn,<br>„street_side“: Parkbucht,<br>„on_kerb“: auf dem Gehweg,<br>„half_on_kerb“: halb auf dem Gehweg,<br>„shoulder“: Seitenstreifen.|
|orientation | Ausrichtung der parkenden Fahrzeuge:<br>„parallel“: Längsparken,<br>„diagonal“: Schrägparken,<br>„perpendicular“: Querparken).|
|capacity | Anzahl der Stellplätze pro Straßensegment|
|source:capacity | Quelle der Anzahl der Stellplätze pro Straßensegment:<br>„estimated“: Aus Länge des Segments und Ausrichtung der Fahrzeuge interpoliert,<br>„OSM“: Feste Angabe aus OSM übernommen,<br>„survey“: Sonstige manuelle Festlegung.|
|surface | Oberfläche/Belag des Parkbereichs|
|width | Breite/Tiefe des Parkbereichs in Metern|
|markings | „yes“ wenn der Parkbereich mit Straßenmarkierungen versehen ist|
|markings:type | Art der Markierung, falls Parkbereich mit Straßenmarkierungen versehen ist (experimentell)|
|condition_class | Liste geltener Parkbeschränkungen. Die Notation „ @ (Zeitraum/Bedingung)“ wird als Zusatz hinter dem Klassenattribut verwendet, wenn die Beschränkung nur zu bestimmten Zeiten oder anderen Bedingungen gilt. Zuvor angegebene Attribute ohne zeitliche Beschränkung/Bedingung gelten dann nur außerhalb der angegebenen Zeiten/Bedingungen.<br>„free“: Keine Parkbeschränkungen,<br>„residents“: Nur mit Bewohnerparkausweis,<br>„paid“: Nur mit Parkschein,<br>„mixed“: Mit Bewohnerparkausweis oder Parkschein,<br>„time_limited“: zeitliche Beschränkung (Parkscheibe),<br>„loading“: Ladezone,<br>„charging“: Laden von Elektrofahrzeugen,<br>„disabled“: Behindertenparkplatz,<br>„disabled_private“: Behindertenparkplatz mit Parkausweis,<br>„taxi“: Taxenstand,<br>„car_sharing“: Nur für Carsharing-Fahrzeuge,<br>„vehicle_restriction“: Beschränkung auf/Verbot für ausgewiesene Fahrzeugklassen (spezifiziert durch Attribute „vehicle_designated“ und „vehicle_excluded“),<br>„access_restriction“: Zugangsbeschränkung (z.B. privat, nur für Kunden oder Rettungsfahrzeuge),<br>„no_parking“: Parkverbot / Eingeschränktes Haltverbot,<br>„no_stopping“: Halteverbot / Absolutes Haltverbot.|
|vehicle_designated | Beschränkung auf ausgewiesene Fahrzeugklassen (z.B. Pkw, Lkw, Bus)|
|vehicle_excluded | Verbot für einzelne ausgewiesene Fahrzeugklassen|
|zone | Parkzonenbezeichnung/-nummer, wenn ausgewiesen|
|side | Straßenseite des Parkstreifens in Linienrichtung des OSM-Objekts („left“ oder „right“)|
|parking_source | Ursprung der Parkinformation in der OSM-Datenbank:<br>„highway_both“/„highway_left“/„highway_right“: Als Parkstreifeninformation an der Straßenlinie erfasst,<br>„separate_area“/„separate_node“: Separat mit eigener Geometrie erfasst.|
|length | Länge des Parkstreifensegments in Metern|
