import { bbox, centerOfMass } from '@turf/turf'
import axios from 'axios'
import fs from 'fs'

type TRawRegionDataset = {
  name: string
  file_type: 'gpkg' | 'geojson'
  lastUpdate: string
}
type TRawRegion = {
  name: string
  label: string
  lastUpdate: string
  datasets: TRawRegionDataset[]
}
type TRawRegionsResult = {
  regions: { region: TRawRegion[] }
  dataset_url_prefix: string
  license: string
}

export const fetchRegions = async () => {
  const apiUrl = 'https://vts.mapwebbing.eu/export/exports.json'
  const { data: rawRegionsResult } = await axios.get<TRawRegionsResult>(apiUrl)

  const exportUrlTemplate = `${rawRegionsResult.dataset_url_prefix}%REGION%/%DATASET%_%REGION%.%FILETYPE%`

  // This is potentially a ly, but it gets us nice autocomplete in our views.
  type Dataset = {
    name: string
    url: string
    format: TRawRegionDataset['file_type']
    updatedAt: string
  }
  type Datasets = {
    parking_lanes: Dataset
    parking_spaces: Dataset
    parking_segments: Dataset
  }

  const resolveUrlTemplate = (regionName: string, dataset: TRawRegionDataset | undefined) => {
    if (!dataset) return
    return exportUrlTemplate
      .replaceAll('%REGION%', regionName)
      .replaceAll('%DATASET%', dataset.name)
      .replaceAll('%FILETYPE%', dataset.file_type)
  }

  const regions = rawRegionsResult.regions.region.map((region) => {
    const exports = Object.fromEntries(
      region.datasets
        .filter((dataset) => dataset.name !== 'region')
        .map((dataset) => {
          const url = resolveUrlTemplate(region.name, dataset)
          return [dataset.name, { url, format: dataset.file_type, updatedAt: dataset.lastUpdate }]
        })
    ) as Datasets

    return {
      slug: region.name,
      name: region.label,
      exports,
      region: resolveUrlTemplate(
        region.name,
        region.datasets.find((d) => d.name === 'region')
      ) as string, // todo: find a nicer way to type this
    }
  })

  return regions
}

export const fetchRegionWithGeodata = async () => {
  const regions = await fetchRegions()

  const regionsWithGeoJSON = []

  for (const region of regions) {
    const regionDataset = region.region
    if (regionDataset) {
      const { data: regionGeoJSON } = await axios.get<GeoJSON.FeatureCollection>(regionDataset)

      if (regionGeoJSON.features) {
        regionsWithGeoJSON.push({
          ...region,
          bounds: bbox(regionGeoJSON),
          center: centerOfMass(regionGeoJSON).geometry.coordinates,
        })
      }
    }
  }

  return regionsWithGeoJSON
}

const regions = await fetchRegionWithGeodata()
const content = { updatedAt: new Date(Date.now()).toLocaleString('de-DE'), regions }
await fs.writeFileSync('./data/regions.json', JSON.stringify(content, null, 2))
