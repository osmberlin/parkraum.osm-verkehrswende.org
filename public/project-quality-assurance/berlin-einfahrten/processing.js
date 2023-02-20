// Run with node ./qgis-data-to-maproulette.js

const fs = require("fs");

fs.readFile(
  "./input/gehwegueberfahrt_ohne_osmservice.geojson",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const rawData = JSON.parse(data);

    // Get a list of all districts
    let bezirke = rawData.features.map((f) => f.properties.bezirk);
    bezirke = bezirke.filter((item, index) => bezirke.indexOf(item) === index);

    // Cleanup string for filename
    const asFilename = (input) =>
      input.replace(/[^a-z0-9]/gi, "_").toLowerCase();

    // Transpose 'Material' to OSM surface value
    // https://fbinter.stadt-berlin.de/fb_daten/beschreibung/datenformatbeschreibung/Datenformatbeschreibung_Straßenbefahrung_2014.pdf#page=3
    const pickSurface = {
      "01": "concrete",
      "02": "asphalt",
      "03": "sett",
      "04": "sett",
      "05": "sett",
      "06": "paving_stones",
      "07": "paving_stones",
      "08": "paving_stones",
      "09": "paving_stones",
      10: "paving_stones",
    };

    bezirke.forEach((bezirk) => {
      const onlyXhainFeatures = rawData.features.filter(
        (f) => f.properties.bezirk === bezirk
      );

      const processedData = {
        type: "FeatureCollection",
        features: onlyXhainFeatures.map((f) => {
          const task = [
            "Laut Senats-Daten ist hier eine Ausfahrt; und in OSM keine Grundstückszufahrt.",
            "Bitte prüfe, ob an dieser Stelle in OSM eine Ausfahrt erfasst werden sollte.",
            "\n",
            `[**Mapillary** an diesem Ort öffnen](https://www.mapillary.com/app/?lat=${f.geometry.coordinates[1]}&lng=${f.geometry.coordinates[0]}&z=19&dateFrom=2020-01-01)`,
            "\n",
            "**Tagging-Empfehlung Einfahrt:**",
            "* `highway=service`",
            "* `service=driveway`",
            `* \`surface=${pickSurface[f.properties.material]}\``,
            `* \`source:surface="Geoportal Berlin / Straßenbefahrung 2014 (Material ID ${f.properties.material})"\``,
            "\n",
            "**Tagging-Empfehlung Knoten am Haus:**",
            "* mit Tor: `barrier=gate`",
            "* mit Durchgang: `barrier=entrance`",
          ]
            .filter(Boolean)
            .join(" \n");

          return {
            type: "Feature",
            geometry: f.geometry,
            properties: {
              gis_id: f.properties.gis_id,
              task,
            },
          };
        }),
      };

      const writeData = JSON.stringify(processedData, null, 2);
      //console.log(writeData);

      fs.writeFile(
        `./output/einfahrten-${asFilename(bezirk)}.geojson`,
        writeData,
        (err) => {
          if (err) {
            console.error(err);
          }
          console.log(
            bezirk,
            "finished with … features",
            processedData.features.length
          );
        }
      );
    });
  }
);
