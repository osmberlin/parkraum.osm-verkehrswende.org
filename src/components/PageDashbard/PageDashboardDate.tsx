import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

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
    queryFn: async () => {
      const response = await fetch('https://vts.mapwebbing.eu/processing.parking_segments.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    },
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
