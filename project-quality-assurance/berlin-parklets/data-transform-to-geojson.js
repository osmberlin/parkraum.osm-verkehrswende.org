// Run with node ./data-transform-to-geojson.js

const fs = require("fs");

fs.readFile("./data-2022-06-03.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rawData = JSON.parse(data).data;
  console.log(rawData);

  const processedData = {
    type: "FeatureCollection",
    features: rawData.map((f) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          f.attributes.location_point.longitude,
          f.attributes.location_point.latitude,
        ],
      },
      properties: {
        externalId: f.attributes.id,
        externalWallId: f.attributes.wall_id,
        externalLink: f.attributes.permalink,
        headline: f.attributes.headline,
        location_name: f.attributes.location_name,
        created_at: f.attributes.created_at,
        updated_at: f.attributes.updated_at,
        content_updated_at: f.attributes.content_updated_at,
        color: f.attributes.color,
      },
    })),
  };

  fs.writeFile(
    "./data-2022-06-03-processed.geojson",
    JSON.stringify(processedData),
    (err) => {
      if (err) {
        console.error(err);
      }
      console.log("done", processedData.features.length);
    }
  );
});
