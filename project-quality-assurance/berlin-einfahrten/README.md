# About

- Wiki Seite https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Parkraum/Mapping_Kampagne_Xhain/QA-Einfahrten
- Gehwegüberfahrten
  - `Geoportal Berlin / Straßenbefahrung 2014 - Gehwegüberfahrten`
  - Erhebung: 1.1.2014
  - Datenlizenz Deutschland - Namensnennung - Version 2.0, https://www.govdata.de/dl-de/by-2-0
  - Daten https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_Gehwegueberfahrt@senstadt&type=WFS
  - Karte https://fbinter.stadt-berlin.de/fb/index.jsp?loginkey=zoomStart&mapId=k_StraDa@senstadt&bbox=385030,5816573,386009,5817208

# Protocol

## GQIS

1. `TODO`
1. Export as GeoJSON 'EPSG:4326' as `input/gehwegueberfahrt_ohne_osmservice.geojson`

## Prepare Maproulette

For MapRoulette, we want a nice description about what to do, which we create with:

`node ./processing.js`

This script will …

- add a `task` property that describes what do to. This can be used in Maproulette to fill the task description.
- add tag suggestions, translating the `material` key to OSM surface values.
- cleanup all NULL values that QGIS added
- keep the `gis_id` as external source which we use as primary key in Maproulette

## Maproulette

The MapRoulette campaign is linked at https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Parkraum/Mapping_Kampagne_Xhain/QA-Einfahrten.

The geojson that the campaign is based upon is …

- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-charlottenburg_wilme.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-marzahn_hellersdorf.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-pankow.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-steglitz_zehlendorf.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-friedrichshain_kreuzb.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-mitte.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-reinickendorf.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-tempelhof_sch_neberg.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-lichtenberg.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-neuk_lln.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-spandau.geojson
- https://tiles.osm-berlin.org/quality-assurance/berlin-einfahrten/einfahrten-treptow_k_penick.geojson
