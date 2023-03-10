import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()

export const PageDashboardDate = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PageDashboardDateContent />
    </QueryClientProvider>
  )
}

const PageDashboardDateContent: React.FC = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['date'],
    queryFn: () =>
      axios
        .get('https://vts.mapwebbing.eu/processing.parking_segments.json')
        .then((res) => res.data),
  })

  if (isLoading || isFetching) return <i>Lade Daten…</i>

  return (
    <p>
      Stand der Daten:{' '}
      {error ? (
        <span className="text-sm text-red-400">Fehler beim Laden der Daten</span>
      ) : (
        <>
          {new Date(data.description).toLocaleDateString('de-DE', { weekday: 'short' })}{' '}
          {new Date(data.description).toLocaleDateString('de-DE')},{' '}
          {new Date(data.description).toLocaleTimeString('de-DE')}
        </>
      )}
    </p>
  )
}
