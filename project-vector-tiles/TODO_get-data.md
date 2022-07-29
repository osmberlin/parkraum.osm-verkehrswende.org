```
  map.on("sourcedata", (e) => {
    if (e.sourceId.startsWith("vts") && e.isSourceLoaded) {
      const layer = e.sourceId.replace("_tiles", "");
      const stores = map.querySourceFeatures(e.sourceId, {
        sourceLayer: layer,
      });
      console.log({ id: e.sourceId, layer, stores });
    }
  });
```
