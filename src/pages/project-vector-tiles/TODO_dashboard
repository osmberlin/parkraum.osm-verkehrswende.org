# TRYING APLINE JS + AYNC/AWAIT does not work …

<script type="module">
  async function data() {
    const data = await (
      await (
        await fetch("https://vts.mapwebbing.eu/export/boundaries_stats.geojson")
      ).json()
    ).features.map((feature) => feature.properties);

    const parent_names = await data
      .filter((p) => p.parent_id === null)
      .map((p) => p.name);

    const results = {
      district_level: data.filter((p) => p.parent_id === null),
      sub_district_level: Object.fromEntries(
        parent_names
          .map((parent_name) => [
            parent_name,
            data.filter((p) => p.parent_name === parent_name),
          ])
          .filter((value) => value[1].length)
      ),
    };

    console.log(results);

    document.addEventListener("alpine:init", () => {
      Alpine.data("table", () => results);
      console.log({ a: data() });
    });
  }
  data();
</script>

# MAP VERSION

---

title: Dashboard aus dem Projekt "Vector Tiles"
layout: default
noindex: true
menu_highlight: project_vector_tiles_dashboard
map_full_heigth_menu_scroll: true

---

<link rel="stylesheet" href="{{ '/css/maplibre-gl.css' | relative_url }}" />
<script src="{{ 'javascript/maplibre-gl.js' | relative_url }}"></script>

<div class="flex h-full gap-5">
  <div id="map" class="w-100 relative h-full flex-1">TADA</div>

  <div
    id="legend"
    class="vh-100 prose-sm prose-blue absolute inset-x-0 bottom-0 z-1000 hidden h-72 overflow-scroll bg-white px-5 shadow-2xl md:static md:block md:h-auto md:w-60 md:overscroll-auto md:px-0 md:shadow-none"
    data-show-hide-target="legend"
  ></div>
</div>

<script>
  var map = new maplibregl.Map({
    container: "map",
    style:
      "https://api.maptiler.com/maps/pastel/style.json?key=lh0zCEEmjlKmX91QQEAU",
    zoom: 16,
    center: [13.4381, 52.47928],
    hash: true,
    attributionControl: true,
    customAttribution: "Parkraumdaten auf OSM-Basis",
  });
  map.addControl(new maplibregl.NavigationControl());

  map.on("sourcedata", (e) => {
    if (e.sourceId === "vts_boundaries_stats_tiles" && e.isSourceLoaded) {
      const stores = map.querySourceFeatures("vts_boundaries_stats_tiles");
      console.log({ id: e.sourceId, stores });
    }
  });

  // ** Layer: Parking Data *****************************************************************
  map.on("load", function () {
    // Add Mapillary sequence layer.
    // https://www.mapillary.com/developer/tiles-documentation/#sequence-layer
    map.addSource("vts_boundaries_stats_tiles", {
      type: "vector",
      tiles: [
        "https://vts.mapwebbing.eu/public.boundaries_stats/{z}/{x}/{y}.pbf",
      ],
      minzoom: 10,
      maxzoom: 22,
    });

    let hoveredStateId = false; // https://maplibre.org/maplibre-gl-js-docs/example/hover-styles/

    /*
    Quelle: https://vts.mapwebbing.eu/public.boundaries_stats.html
    [
      { name: "id", type: "int8", },
      { name: "name", type: "text", },
      { name: "aera_sqkm", type: "numeric", },
      { name: "street_side_km", type: "numeric", },
      { name: "lane_km", type: "numeric", },
      { name: "d_other_km", type: "numeric", },
      { name: "sum_km", type: "numeric", },
      { name: "length_wo_dual_carriageway", type: "numeric", },
      { name: "done_percent", type: "numeric", },
    ];
    */
    map.addLayer({
      id: "vts_boundaries_stats_labels",
      source: "vts_boundaries_stats_tiles",
      "source-layer": "public.boundaries_stats",
      type: "symbol",
      layout: {
        "text-field": "xxx",
        "symbol-placement": "line-center",
        "text-size": 40,
        "text-justify": "center",
        "icon-optional": true,
      },
      paint: {
        "text-color": "rgba(0, 0, 0, 1)",
        "text-halo-color": "rgba(255, 255, 255, 0.9)",
        "text-halo-width": 2,
      },
    });

    map.addLayer({
      id: "vts_boundaries_stats_line",
      source: "vts_boundaries_stats_tiles",
      "source-layer": "public.boundaries_stats",
      type: "line",
      paint: {
        "line-width": 2,
        "line-color": "rgba(215, 34, 34, 1)",
      },
    });

    map.addLayer({
      id: "vts_boundaries_stats_fill",
      source: "vts_boundaries_stats_tiles",
      "source-layer": "public.boundaries_stats",
      type: "fill",
      //filter: ["all", [">=", "admin_level", "'10'"]],
      paint: {
        "fill-color": "rgba(215, 34, 34, 1)",
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.5,
        ],
      },
    });

    // Code thanks to https://maplibre.org/maplibre-gl-js-docs/example/hover-styles/

    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on("mousemove", "vts_boundaries_stats_fill", (e) => {
      if (!e.features) return;

      console.log({ e, f: e.features, hoveredStateId });
      if (hoveredStateId) {
        map.setFeatureState(
          { source: "public.boundaries_stats", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].properties.id;
      map.setFeatureState(
        { source: "public.boundaries_stats", id: hoveredStateId },
        { hover: true }
      );
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on("mouseleave", "vts_boundaries_stats_fill", () => {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: "public.boundaries_stats", id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
    });
  });

  // ** OnClick + Sum ***********************************************************************
  map.on("load", () => {});

  map.on("idle", () => {});
</script>
