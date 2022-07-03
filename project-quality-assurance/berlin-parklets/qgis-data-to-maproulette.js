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

      const taskPartMapillary = `\n\n
      **Mapillary:**\n
      [Mapillary an diesem Ort öffnen](https://www.mapillary.com/app/?lat=${f.geometry.coordinates[1]}&lng=${f.geometry.coordinates[1]}&z=17&dateFrom=2022-01-01)\n
      [Verknüpftes Mapillary-Bild](https://www.mapillary.com/app/?pKey=${f.properties.JOIN_mapillary})\n
      `;

      const taskPartTagging = `\n\n
      **Tagging-Tipps:**\n
      * Parklet: Eine Fläche mit \`leisure=parket\` + \`check_date\`\n
      * Planter: Eine Fläche mit \`man_made=planter\` + \`check_date\` + \`planter:position=lane\` oder \`street_side\` (Parkbucht)\n
      `;

      if (f.NUM_OSM_IN_EXT_DATA > 0) {
        // Found someting in OSM nearby the source data.
        if (f.JOIN_leisure === "parklet") {
          task = `Hier gibt es laut externen Daten ein Parklet.\n
            Wir haben im Umkreis ein Parket gefunden.\n
            Bitte prüfe die Tags, ergänze einen \`mapillary\`-Tag (wenn möglich)
            und ergänze gerne ein \`check_date\` (ggf. basierend auf dem Mapillary Bild-Datum).\n`;
        } else if (f.JOIN_man_made === "planter") {
          task = `Hier gibt es laut externen Daten ein Parklet.\n
            Wir haben im Umkreis einen \`man_made=planter\` gefunden.\n
            Bitte prüfe, ob dieser Planter an der Stelle gemapped ist, wo das Parklet steht.\n
            Bitte füge \`planter:position=lane\` oder \`street_side\` hinzu,
            damit er automatisch aus dem Parkstreifen ausgestanzt werden kann.\n
            Bitte prüfe die Tags, ergänze einen \`mapillary\`-Tag (wenn möglich)
            und ergänze gerne ein \`check_date\` (ggf. basierend auf dem Mapillary Bild-Datum).\n
            ${taskPartMapillary}
            ${taskPartTagging}`;
        } else if (
          f.JOIN_outdoor_seating === "parket" &&
          f.JOIN_leisure === "outdoor_seating"
        ) {
          task = `Hier gibt es laut externen Daten ein Parklet.\n
            Wir haben im Umkreis ein \`leisure=outdoor_seating\`+\`outdoor_seatig=parklet\` gefunden.\n
            Bitte prüfe, ob diese Fläche für Außengastronomie an der Stelle gemapped ist, wo das Parklet steht.\n
            Bitte prüfe die Tags, ergänze einen \`mapillary\`-Tag (wenn möglich)
            und ergänze gerne ein \`check_date\` (ggf. basierend auf dem Mapillary Bild-Datum).\n
            ${taskPartMapillary}
            ${taskPartTagging}`;
        } else {
          task = "TODO: OSM data found but no match in which data.";
        }
      } else {
        task = `Wir haben im Umkreis kein Parklet oder Planter gefunden. Bitte trage einen ein.\n
            ${taskPartMapillary}
            ${taskPartTagging}`;
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
