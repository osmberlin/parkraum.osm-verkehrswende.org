const updateMapButtonsWithLocation = (map) => {
  const center = map.getCenter();
  const zoom = map.getZoom();
  const precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
  const lat = center.lat.toFixed(precision);
  const lng = center.lng.toFixed(precision);

  /** @type HTMLAnchorElement | null */
  const mapillaryLink = document.querySelector("[data-update-mapillary-link]");
  if (mapillaryLink) {
    const defaultDateFilterDate = "2020-01-01"; // So we only show nice and new data by default
    mapillaryLink.href = `https://www.mapillary.com/app/?z=${zoom}&lat=${lat}&lng=${lng}&focus=map&dateFrom=${defaultDateFilterDate}`;
  }
  /** @type HTMLAnchorElement | null */
  const kartaviewLink = document.querySelector("[data-update-kartaview-link]");
  if (kartaviewLink) {
    kartaviewLink.href = `https://kartaview.org/map/@${lat},${lng},${zoom}z`;
  }
  /** @type HTMLAnchorElement | null */
  const editOsmLink = document.querySelector("[data-update-edit-osm]");
  if (editOsmLink) {
    // Will pick the default editor based on user preferences. Add ?editor=id to force iD.
    editOsmLink.href = `https://www.openstreetmap.org/edit#map=${zoom}/${lat}/${lng}`;
  }
};
