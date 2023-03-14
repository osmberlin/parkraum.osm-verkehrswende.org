import { keyToName } from '@components/regions/utils/keyToName'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()

type Props = { regionKey: string }

export const PageDashboardTable: React.FC<Props> = ({ regionKey }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageDashboardTableContent regionKey={regionKey} />
    </QueryClientProvider>
  )
}
type Response = {
  id: number
  name: string
  parent_id: number | null
  parent_name: number | null
  admin_level: number
  aera_sqkm: number
  street_side_km: number
  lane_km: number
  d_other_km: number
  sum_km: number
  length_wo_dual_carriageway: number
  done_percent: number
  childs?: any
}

export const regionExportUrl = (regionKey: string) => {
  return `https://vts.mapwebbing.eu/export/region_${regionKey}.geojson`
}

const PageDashboardTableContent: React.FC<Props> = ({ regionKey }) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['date'],
    queryFn: () => axios.get(regionExportUrl(regionKey)).then((res) => res.data),
  })

  if (isLoading || isFetching) return <i>Lade Daten…</i>

  let city: Response[] = []
  let districts: Response[] = []
  const suburbs: Record<string, Response[]> = {}
  if (data) {
    const flatFeatureProperties = data.features?.map((feature: any) => feature.properties)

    city = flatFeatureProperties?.filter(
      (p: any) => p.admin_level === 4 && p.name !== 'Brandenburg'
    )

    // In Hannover, the output does not have admin_level 9, so we need to jump to the districts directly.
    const cityOrUseDistrictsDireclty =
      city?.[0]?.childs?.map((feature: any) => feature.properties) || flatFeatureProperties

    districts = cityOrUseDistrictsDireclty?.filter((p: any) => p.admin_level === 9)

    districts?.forEach((district) => {
      const topLevelDistrict = data.features
        .map((feature: any) => feature.properties)
        .filter((p: any) => p.admin_level === 9 && p.name === district.name)

      suburbs[district.name] = topLevelDistrict?.[0]?.childs
        ?.map((feature: any) => feature.properties)
        ?.filter((p: any) => p.admin_level === 10)
    })

    // For Kiel, we start at admin_level 10, so the code above will not add any data.
    if (!Object.keys(suburbs).length) {
      suburbs[keyToName(regionKey)] = flatFeatureProperties?.filter(
        (p: any) => p.admin_level === 10
      )
    }
  }

  // See https://docs.google.com/spreadsheets/d/1mgIu-WV_OtLKdX6gt6JUfze-iTXXh8jLByi3o-wmd04/edit#gid=0
  // const debugOutput = structuredClone(data)
  // const debugStructure: any[] = []
  // debugOutput.features.forEach((d: any) => {
  //   debugStructure.push(
  //     [
  //       'name',
  //       d.properties.name,
  //       'level',
  //       d.properties.admin_level,
  //       'name',
  //       '.',
  //       'level',
  //       '.',
  //       '%',
  //       d.properties.done_percent,
  //       'children-prop-count',
  //       d?.properties?.childs?.length,
  //     ].join(';')
  //   )
  //   d.geometry = '__REMOVED__'
  //   d.properties.geom_label = '__REMOVED__'
  //   d?.properties?.childs?.forEach((c: any) => {
  //     debugStructure.push(
  //       [
  //         'name',
  //         d.properties.name,
  //         'level',
  //         d.properties.admin_level,
  //         'name',
  //         c.properties.name,
  //         'level',
  //         c.properties.admin_level,
  //         '%',
  //         c.properties.done_percent,
  //         'children-prop-count',
  //         c.properties?.childs?.length,
  //       ].join(';')
  //     )
  //     c.geometry = '__REMOVED__'
  //     c.properties.geom_label = '__REMOVED__'
  //   })
  // })

  if (!city) {
    return <p className="px-4 text-sm text-red-400 sm:pl-6">Fehler beim Laden der Daten</p>
  }

  return (
    <>
      <div className="border-b border-b-gray-300 bg-gray-50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        {city.map((c) => (
          <div key={c.name}>
            {c.name}: {c.done_percent.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
            &thinsp;%
          </div>
        ))}
      </div>
      <table className="!my-0 min-w-full divide-y divide-gray-300">
        {Boolean(districts?.length) && (
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Bezirk
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              ></th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Anteil gemapped
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          <>
            {districts?.map((district) => {
              return (
                <tr key={district.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {district.name}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {district.parent_name}
                  </td>
                  <td className="relative whitespace-nowrap px-3 py-4 text-xl text-gray-500">
                    {district.done_percent.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
                    &thinsp;%
                    <div
                      className="absolute inset-y-0 -z-10 bg-teal-500 opacity-20"
                      style={{ width: `${district.done_percent}%` }}
                    />
                  </td>
                </tr>
              )
            })}
            <tr className="bg-gray-50">
              <th
                colSpan={3}
                className="border-t border-t-gray-300 py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-6"
              >
                Ortsteile
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Bezirk
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Ortsteil
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Anteil gemapped
              </th>
            </tr>
            {error ? (
              <tr>
                <td colSpan={3} className="px-4 text-sm text-red-400 sm:pl-6">
                  Fehler beim Laden der Daten
                </td>
              </tr>
            ) : (
              Object.entries(suburbs)?.map(([districtName, districtSuburbs]) => {
                return districtSuburbs.map((suburb) => {
                  return (
                    <tr key={suburb.id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {districtName}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900">{suburb.name}</td>
                      <td className="relative whitespace-nowrap px-3 py-4 text-xl text-gray-500">
                        {suburb.done_percent.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
                        &thinsp;%{}
                        <div
                          className="absolute inset-y-0 -z-10 bg-emerald-500 opacity-20"
                          style={{ width: `${suburb.done_percent}%` }}
                        />
                      </td>
                    </tr>
                  )
                })
              })
            )}
          </>
        </tbody>
      </table>
      <div className="text-gray-9 00 border-t border-t-gray-300 bg-gray-50 py-2 pl-4 pr-3 text-left text-sm text-gray-500 sm:pl-6">
        API URL <code>{regionExportUrl(regionKey)}</code>
      </div>
      {/* <details className="mt-10" open id="debugOutput">
        <summary>Debug Output</summary>
        <pre>{JSON.stringify(debugStructure, undefined, 2)}</pre>
      </details> */}
    </>
  )
}
