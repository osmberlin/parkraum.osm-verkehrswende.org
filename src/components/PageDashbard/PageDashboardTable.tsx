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
}

const PageDashboardTableContent: React.FC<Props> = ({ regionKey }) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['date'],
    queryFn: () =>
      axios
        .get(`https://vts.mapwebbing.eu/export/region_${regionKey}.geojson`)
        .then((res) => res.data),
  })

  if (isLoading || isFetching) return <i>Lade Daten…</i>

  let districts: Response[] = []
  let sub_districts: Response[] = []
  if (data) {
    districts = data.features
      .map((feature: any) => feature.properties)
      .filter((p: any) => p.childs !== null)

    sub_districts = data.features
      .map((feature: any) => feature.properties)
      .filter((p: any) => p.childs === null)
  }

  return (
    <table className="!my-0 min-w-full divide-y divide-gray-300">
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
      <tbody>
        {!districts.length && (
          <tr>
            <td colSpan={3} className="px-4 text-sm text-red-400 sm:pl-6">
              Fehler beim Laden der Daten
            </td>
          </tr>
        )}
        {districts.map((district) => {
          return (
            <tr key={district.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {district.name}
              </td>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {district.parent_name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-xl text-gray-500">
                {district.done_percent.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
                &thinsp;%
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
          sub_districts.map((district) => {
            return (
              <tr key={district.id}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {district.parent_name}
                </td>
                <td className="px-3 py-4 text-sm font-medium text-gray-900">{district.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-xl text-gray-500">
                  {district.done_percent.toLocaleString('de-DE', { minimumFractionDigits: 1 })}
                  &thinsp;%{}
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}
