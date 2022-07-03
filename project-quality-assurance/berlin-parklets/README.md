# Protocol

## External Data

1. Data from https://padlet.com/parklets/Parklets13012022
   Dowlaod file as `json` https://api.padlet.com/api/5/wishes?wall_id=154419585

2. Process the data with `node ./data-transform-to-geojson.js` from within this folder

3. Test `data-2022-06-03-processed.geojson` with on https://geojson.io/

## OSM Data

1. Get the Data from OSM. This also transforms area to nodes (`out center`).
   Safe as GeoJSON

```
[out:json][timeout:25];
{{geocodeArea:Berlin, Germany}}->.searchArea;
(
  // query part for: “man_made=planter”
  node["man_made"="planter"](area.searchArea);
  way["man_made"="planter"](area.searchArea);
  // query part for: “outdoor_seating=parket”
  node["outdoor_seating"="parket"](area.searchArea);
  way["outdoor_seating"="parket"](area.searchArea);
  // query part for: “leisure=parklet”
  node["leisure"="parklet"](area.searchArea);
  way["leisure"="parklet"](area.searchArea);
);
out center;
```

## GQIS

1. Add both geojson files
1. Run "Buffer" on the external data with 0.0005 degrees.
   (The external data is geolocated at the address, which is sometimes 25-50 meter away from the parklet; the 0.0005 degrees looked like a good approximation of that.)
   This will create an area of each external data point to work with.
   `processing.run("native:buffer", {'INPUT':'./project-quality-assurance/berlin-parklets/data-2022-06-03-processed.geojson','DISTANCE':0.0005,'SEGMENTS':5,'END_CAP_STYLE':0,'JOIN_STYLE':0,'MITER_LIMIT':2,'DISSOLVE':False,'OUTPUT':'TEMPORARY_OUTPUT'})`
1. Run "Join attributes by location" with "intercet, contain, overlap, are within" (Join features 'Buffered', Compare to OSM Export)
   Prefix the joined table with `JOIN`.
   This will give us a layer based on the Buffer _plus_ all the OSM tags inside this area.
   `processing.run("native:joinattributesbylocation", {'INPUT':'memory://MultiPolygon?crs=EPSG:4326&field=externalId:integer(0,0)&field=externalWallId:integer(0,0)&field=externalLink:string(0,0)&field=headline:string(0,0)&field=location_name:string(0,0)&field=created_at:datetime(0,0)&field=updated_at:datetime(0,0)&field=content_updated_at:datetime(0,0)&field=color:string(0,0)&uid={84b10d68-6099-4812-adbb-f64c5101e958}','PREDICATE':[0,1,4,5],'JOIN':'./OSM-Dat.geojson','JOIN_FIELDS':[],'METHOD':0,'DISCARD_NONMATCHING':False,'PREFIX':'JOIN_','OUTPUT':'TEMPORARY_OUTPUT'})`
1. Run "Count points in polygon" on the "Buffered" Data (Polygon the joined layer, Points the OSM Export)
   Add field `NUM_OSM_IN_EXT_DATA`, which will show if/how many OSM Objects are mapped nearby this external data point.
   This will give us the number of OSM objects (as number) in the area of external data.
   `processing.run("native:countpointsinpolygon", {'POLYGONS':'memory://MultiPolygon?crs=EPSG:4326&field=externalId:integer(0,0)&field=externalWallId:integer(0,0)&field=externalLink:string(0,0)&field=headline:string(0,0)&field=location_name:string(0,0)&field=created_at:datetime(0,0)&field=updated_at:datetime(0,0)&field=content_updated_at:datetime(0,0)&field=color:string(0,0)&uid={84b10d68-6099-4812-adbb-f64c5101e958}','POINTS':'./OSM-Data.geojson','WEIGHT':'','CLASSFIELD':'','FIELD':'NUM_OSM_IN_EXT_DATA','OUTPUT':'TEMPORARY_OUTPUT'})`
1. Run "Centroids" on the last data layer.
   This will give us Points again, which we can use in MapRoulette.
   `processing.run("native:centroids", {'INPUT':'memory://MultiPolygon?crs=EPSG:4326&field=externalId:integer(0,0)&field=externalWallId:integer(0,0)&field=externalLink:string(0,0)&field=headline:string(0,0)&field=location_name:string(0,0)&field=created_at:datetime(0,0)&field=updated_at:datetime(0,0)&field=content_updated_at:datetime(0,0)&field=color:string(0,0)&field=JOIN_id:string(0,0)&field=JOIN_%40id:string(0,0)&field=JOIN_barrier:string(0,0)&field=JOIN_bicycle:string(0,0)&field=JOIN_foot:string(0,0)&field=JOIN_man_made:string(0,0)&field=JOIN_motor_vehicle:string(0,0)&field=JOIN_%40geometry:string(0,0)&field=JOIN_natural:string(0,0)&field=JOIN_leisure:string(0,0)&field=JOIN_description:string(0,0)&field=JOIN_mapillary:string(0,0)&field=JOIN_parklet%3Aposition:string(0,0)&field=JOIN_fixme:string(0,0)&field=JOIN_material:string(0,0)&field=NUM_OSM_IN_EXT_DATA:double(0,0)&uid={4a445fd6-75c7-4d08-a8b3-d8b1f2769d84}','ALL_PARTS':False,'OUTPUT':'TEMPORARY_OUTPUT'})`
1. Export as GeoJSON 'EPSG:4326' as `qgis.geosjon`

## Prepare Maproulette

For MapRoulette, we want a nice description about what to do, which we create with:

`node ./qgis-data-to-maproulette.js`

This script will

- add a `task` property that describes what do to. This can be used in Maproulette to fill the task description.
- cleanup all NULL values that QGIS added

## Maproulette

The campaign can be found here: `<TODO>`

The geojson that the campaign is based upon is: `<todo>`
