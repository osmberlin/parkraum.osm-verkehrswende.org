import { bbox, centerOfMass } from '@turf/turf'
import axios from 'axios'
import fs from 'fs'

type TRawRegionExport = {
  name: string
  file_type: 'gpkg' | 'geojson'
  lastUpdate: string
}
type TRawRegion = {
  name: string
  label: string
  lastUpdate: string
  exports: TRawRegionExport[]
}
type TRawRegionsResult = {
  regions: { region: TRawRegion[] }
  export_url_prefix: string
  license: string
}

export const fetchRegions = async () => {
  const apiUrl = 'https://vts.mapwebbing.eu/export/exports.json'
  const { data: rawRegionsResult } = await axios.get<TRawRegionsResult>(apiUrl)

  const exportUrlTemplate = `${rawRegionsResult.export_url_prefix}%REGION%/%DATASET%_%REGION%.%FILETYPE%`

  // This is potentially a ly, but it gets us nice autocomplete in our views.
  type Dataset = {
    name: string
    url: string
    format: TRawRegionExport['file_type']
    updatedAt: string
  }
  type Datasets = {
    parking_lanes: Dataset
    parking_spaces: Dataset
    parking_segments: Dataset
  }

  const resolveUrlTemplate = (regionName: string, eexport: TRawRegionExport | undefined) => {
    if (!eexport) return
    return exportUrlTemplate
      .replaceAll('%REGION%', regionName)
      .replaceAll('%DATASET%', eexport.name === 'summary' ? 'region' : eexport.name)
      .replaceAll('%FILETYPE%', eexport.file_type)
  }

  const regions = rawRegionsResult.regions.region.map((region) => {
    const eexports = Object.fromEntries(
      region.exports
        .filter((eexport) => eexport.name !== 'summary')
        .map((eexport) => {
          const url = resolveUrlTemplate(region.name, eexport)
          return [eexport.name, { url, format: eexport.file_type, updatedAt: eexport.lastUpdate }]
        }),
    ) as Datasets

    return {
      slug: region.name,
      name: region.label,
      exports: eexports,
      region: resolveUrlTemplate(
        region.name,
        region.exports.find((d) => d.name === 'summary'),
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
