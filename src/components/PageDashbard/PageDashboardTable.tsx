import { Link } from '@components/Link'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()

type Props = {
  apiUrl: string
}

export const PageDashboardTable: React.FC<Props> = ({ apiUrl }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageDashboardTableContent apiUrl={apiUrl} />
    </QueryClientProvider>
  )
}

const ApiUrl = ({ apiUrl }: { apiUrl: string }) => {
  return (
    <div className="py-2 pr-3 pl-4 text-left text-sm text-gray-500 sm:pl-6">
      API URL{' '}
      <Link to={apiUrl} blank>
        <code>{apiUrl}</code>
      </Link>
    </div>
  )
}

type Properties = {
  id: number
  name: string
  admin_level: number
  area_sqkm: number
  street_side_km: number
  lane_km: number
  d_other_km: number
  sum_km: number
  length_wo_dual_carriageway: number
  done_percent: number
  geom_label: GeoJSON.Point
  childs?: GeoJSON.Feature<GeoJSON.MultiPolygon, Omit<Properties, 'childs'>>[]
}
type Feature = GeoJSON.Feature<GeoJSON.MultiPolygon, Properties>

const PageDashboardTableContent: React.FC<Props> = ({ apiUrl }) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['date'],
    queryFn: () => axios.get(apiUrl).then((res) => res.data),
  })

  if (isLoading || isFetching) return <i>Lade Daten…</i>

  // Thanks ChatGPT
  function filterByUniqueID(objects: Result[]) {
    const uniqueObjects: Result[] = Object.values(
      objects.reduce((acc: { [unique_id: string]: Result }, obj) => {
        if (!acc[obj.unique_id] || obj.admin_level > (acc[obj.unique_id]?.admin_level || 0)) {
          acc[obj.unique_id] = obj
        }
        return acc
      }, {}),
    )

    return uniqueObjects
  }

  // Thanks ChatGPT
  function groupByCombination(objects: Result[]) {
    const groupedObjects: { [key: string]: Result[] } = {}

    objects.forEach((obj) => {
      const key = `${obj.table_level}--${obj.parent_name}`
      if (!groupedObjects[key]) {
        groupedObjects[key] = []
      }
      // @ts-ignore "Object is possibly 'undefined'." is not true here
      groupedObjects[key].push(obj)
    })

    const filteredGroupedObjects: { [key: string]: Result[] } = {}
    Object.keys(groupedObjects).forEach((key) => {
      // @ts-ignore "Object is possibly 'undefined'." is not true here
      if (groupedObjects[key].length > 1) {
        // @ts-ignore Type 'undefined' is not assignable to type 'Result[]'.ts is not true here
        filteredGroupedObjects[key] = groupedObjects[key]
      }
    })

    return filteredGroupedObjects
  }

  type Result = {
    table_level: number
    unique_id: string
    parent_name: string
    parent_admin_level: number
    parent_id: number
  } & Omit<Properties, 'child' | 'geom_label'>

  const result: Result[] = []
  const pushLine = (
    tableLevel: number,
    parentName: string,
    parentAdminLevel: number,
    parentId: number,
    properties: Properties,
  ) => {
    result.push({
      table_level: tableLevel,
      unique_id: `${properties.id}--${properties.admin_level}--${properties.name}`,
      parent_name: parentName,
      parent_admin_level: parentAdminLevel,
      parent_id: parentId,
      // Properties
      id: properties.id,
      name: properties.name,
      admin_level: properties.admin_level,
      area_sqkm: properties.area_sqkm,
      street_side_km: properties.street_side_km,
      lane_km: properties.lane_km,
      d_other_km: properties.d_other_km,
      sum_km: properties.sum_km,
      length_wo_dual_carriageway: properties.length_wo_dual_carriageway,
      done_percent: properties.done_percent,
    })
  }

  if (data) {
    const features = data.features as Feature[]
    // Level 1
    features.forEach((level1) => {
      pushLine(
        1,
        '(Oberste Ebene)',
        level1.properties.admin_level,
        level1.properties.id,
        level1.properties,
      )
      // Level 2
      if (level1.properties.childs) {
        level1.properties.childs.forEach((level2) => {
          // The children layer only go 1 level deep.
          // After this, we need to use the admin_level to create our hierarchy
          pushLine(
            level2.properties.admin_level === 10 ? 3 : level2.properties.admin_level === 9 ? 2 : 99,
            `${level1.properties.name} (Admin Level ${level2.properties.admin_level})`,
            level1.properties.admin_level,
            level1.properties.id,
            level2.properties,
          )
        })
      }
    })
  }
  const filteredResult = filterByUniqueID(result)
  const filteredGroupedResult = groupByCombination(filteredResult)
  if (error) {
    console.log('result', result)
    console.log('unique', filteredResult)
    console.log('grouped', filteredGroupedResult)
  }

  if (!filteredGroupedResult) {
    return (
      <div>
        <p className="px-4 text-sm text-red-400 sm:pl-6">Fehler beim Laden der Daten</p>
        <ApiUrl apiUrl={apiUrl} />
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="my-10 px-4 text-sm text-red-400 sm:pl-6">Fehler beim Laden der Daten</div>
      )}

      {Object.entries(filteredGroupedResult).map(([key, values]) => {
        const [_tableLevel, tableHead] = key.split('--')
        return (
          <div key={key} className="mb-10 flex flex-col">
            <div className="overflow-hidden shadow-sm ring-1 ring-black/5 md:rounded-lg">
              <table className="my-0! min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm text-gray-900 sm:pl-6"
                    >
                      <strong className="font-semibold">{tableHead}</strong>{' '}
                      <span className="font-normal text-gray-500">– Stadt/Bezirk/Stadtteil</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Anteil gemapped
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values.map((value) => {
                    return (
                      <tr key={value.id}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          {value.name}
                        </td>
                        <td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-6">
                          {value.parent_name}
                        </td>
                        <td className="relative w-52 px-3 py-4 text-xl whitespace-nowrap text-gray-500">
                          {value.done_percent.toLocaleString('de-DE', {
                            minimumFractionDigits: 1,
                          })}
                          &thinsp;%
                          <div
                            className="absolute inset-y-0 -z-10 bg-teal-500 opacity-20"
                            style={{ width: `${value.done_percent}%` }}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}

      <ApiUrl apiUrl={apiUrl} />
    </>
  )
}
