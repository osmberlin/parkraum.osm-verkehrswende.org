// Run with node ./qgis-data-to-maproulette.js

const fs = require("fs");

fs.readFile("./qgis.geojson", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rawData = JSON.parse(data);
  // console.log(rawData);

  const processedData = {
    type: "FeatureCollection",
    features: rawData.features.map((f) => {
      let task = "";

      if (f.NUM_OSM_IN_EXT_DATA > 0) {
        // Found someting in OSM nearby the source data.
        if (f.JOIN_leisure === "parklet") {
          task = `Hier gibt es laut externen Daten ein Parklet.
            Wir haben im Umkreis ein Parket gefunden.
            Bitte prüfe die Tags, ergänze einen \`mapillary\`-Tag (wenn möglich)
            und ergänze gerne ein \`check_date\` (ggf. basierend auf dem Mapillary Bild-Datum).`;
        } else if (f.JOIN_man_made === "planter") {
          task = `Hier gibt es laut externen Daten ein Parklet.
            Wir haben im Umkreis einen \`man_made=planter\` gefunden.
            Bitte prüfe, ob dieser Planter an der Stelle gemapped ist, wo das Parklet steht.
            Bitte füge \`planter:position=lane\` oder \`street_side\` hinzu,
            damit er automatisch aus dem Parkstreifen ausgestanzt werden kann.
            Bitte prüfe die Tags, ergänze einen \`mapillary\`-Tag (wenn möglich)
            und ergänze gerne ein \`check_date\` (ggf. basierend auf dem Mapillary Bild-Datum).`;
        } else if (
          f.JOIN_outdoor_seating === "parket" &&
          f.JOIN_leisure === "outdoor_seating"
        ) {
          task = `Hier gibt es laut externen Daten ein Parklet.
            Wir haben im Umkreis ein \`leisure=outdoor_seating\`+\`outdoor_seatig=parklet\` gefunden.
            Bitte prüfe, ob diese Fläche für Außengastronomie an der Stelle gemapped ist, wo das Parklet steht.
            Bitte prüfe die Tags, ergänze einen \`mapillary\`-Tag (wenn möglich)
            und ergänze gerne ein \`check_date\` (ggf. basierend auf dem Mapillary Bild-Datum).`;
        } else {
          task = "TODO: OSM data found but no match in which data.";
        }
      } else {
        task =
          "Wir haben im Unkreis kein Parklet oder Planter gefunden. Bitte trage einen ein.";
      }

      return {
        type: "Feature",
        geometry: f.geometry,
        properties: {
          task: task,
          ...Object.fromEntries(
            Object.entries(f.properties).filter(([_k, v]) => v !== null)
          ),
        },
      };
    }),
  };

  const writeData = JSON.stringify(processedData, null, 2);
  console.log(writeData);

  fs.writeFile("./gqis-for-maproulette.geojson", writeData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("finished with … features", processedData.features.length);
  });
});
