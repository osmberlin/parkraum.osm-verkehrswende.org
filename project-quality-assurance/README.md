# About

Evaluation of mapped service ways in OSM (in Berlin, Germany). To identify where OSM service-ways are missing, a comparison with open data from the Berlin Senate was carried out. 


More information:
- Wiki Seite https://wiki.openstreetmap.org/wiki/Berlin/Verkehrswende/Parkraum/Mapping_Kampagne_Xhain/QA-Einfahrten


# Protocol

## Geoportal Berlin Data

1. Dataset “Straßenbefahrung 2014”, Layer “Gehwegüberfahrt” (Exits). Coordinates System EPSG:25833
https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_Gehwegueberfahrt@senstadt&type=WFS


2. Dataset “Berlin’s districts” 
https://fbinter.stadt-berlin.de/fb/berlin/service_intern.jsp?id=s_wfs_alkis_bezirk@senstadt&type=WFS


## OSM Data

1. For the present purpose, Service-Ways are needed.  Get the OSM Data  direct from https://overpass-turbo.eu/ or with QGIS Plugin “QuickOSM”. Query for the last mencioned option:

```
[out:xml] [timeout:25];
{{geocodeArea:Berlin}} -> .area_0;
(
way["highway"="service"](area.area_0);
);
(._;>;);
out body;

```

## QGIS

1. Connect WFS and export datasets as shapefiles. EPSG:25833 (‘exits’ and ‘districts’). Both have polygon geometries.

1. Add OSM Data and export as shapefile EPSG:25833 (‘service_ways’, line layer)

1. Apply Fix Geometries for the ‘exits’ layer.
```
   Algorithm 'Fix geometries' starting…
      Input parameters:
      { 'INPUT' : 'C:/Users/Public/Documents/Parkraum/exits.shp', 'OUTPUT' : 'TEMPORARY_OUTPUT' }

      Execution completed in 7.91 seconds
      Results:
      {'OUTPUT': 'Fixed_geometries_0ca82017_caeb_4dce_be3e_9a7145604b08'}

      Loading resulting layers
   Algorithm 'Fix geometries' finished
```
1. Create spatial indexes for ‘exits’ (the one with fixed geometries) and ‘service-ways’ layers.

1. Use Join Attributes by location to add the district name in ‘exits’ attribute table 
   ```
   Algorithm 'Join attributes by location' starting…
      Input parameters:
      { 'DISCARD_NONMATCHING' : False, 'INPUT' : 'memory://MultiPolygon?crs=EPSG:25833&field=elem_nr:string(254,0)&field=flaeche:double(23,15)&field=gis_id:string(254,0)&field=material:string(254,0)&field=bezirk:string(254,0)&field=osm_servic:string(10,0)&field=bezirk2:string(21,0)&uid={cef2c213-593e-4d5f-8c09-57572b7c9195}', 'JOIN' : 'C:/Users/Public/Documents/Parkraum/districts.shp', 'JOIN_FIELDS' : [], 'METHOD' : 1, 'OUTPUT' : 'TEMPORARY_OUTPUT', 'PREDICATE' : [5], 'PREFIX' : '' }

      Execution completed in 6.46 seconds
      Results:
      {'JOINED_COUNT': 153511,
      'OUTPUT': 'Joined_layer_6ea81f01_3e12_404c_b6cc_a1cad23389d3'}

      Loading resulting layers
   Algorithm 'Join attributes by location' finished

1. Select by location: Select every polygon from ‘exits’ that touches or intersects a ‘service_ways’ line.
```
   Algorithm 'Select by location' starting…
      Input parameters:
      { 'INPUT' : 'C:/Users/Public/Documents/Parkraum/exits.shp', 'INTERSECT' : 'C:/Users/Public/Documents/Parkraum/service_ways.shp', 'METHOD' : 0, 'PREDICATE' : [0,4] }

      Execution completed in 66.78 seconds (1 minute 7 seconds)
      Results:
      {'OUTPUT': 'exits_b_c3971341_d54c_4114_8dcd_8831b1c7d43d'}

      Loading resulting layers
   Algorithm 'Select by location' finished
```
1. Open the attribute table of ‘exits’ and with the field calculator add a new attribute (‘osm_service’) and insert the value 1.

1. Reverse selection and for the new selected polygons add value 0 (in ‘osm_service’)

1. Filter ‘exits‘ Layer, showing just the ‘osm_value’ 0 (all polygons not touching a osm-service line) and run "Centroids" on the last data layer.
  ```
   Algorithm 'Centroids' starting…
      Input parameters:
      { 'ALL_PARTS' : False, 'INPUT' : 'memory://memory?geometry=MultiPolygon&crs=EPSG:25833&field=elem_nr:string(254,0)&field=flaeche:double(23,15)&field=gis_id:string(254,0)&field=material:string(254,0)&field=bezirk:string(254,0)&field=osm_servic:string(10,0)&field=bezirk2:string(21,0)', 'OUTPUT' : 'TEMPORARY_OUTPUT' }

      Execution completed in 1.74 seconds
      Results:
      {'OUTPUT': 'Centroids_108acec5_9332_48e9_a56c_98f77c1070fa'}

      Loading resulting layers
   Algorithm 'Centroids' finished
```
1. Export the result as a GeoJSON 'EPSG:4326'  (exits_without_serviceway)