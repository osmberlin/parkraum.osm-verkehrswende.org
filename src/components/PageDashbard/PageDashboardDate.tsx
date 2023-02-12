const date = await fetch('https://vts.mapwebbing.eu/public.highways.json')
  .then((response) => {
    if (response.status >= 400 && response.status < 600) {
      throw new Error('Bad response from server')
    }
    return response
  })
  .then((response) => response.json())
  .then((json) => json.description)
  .catch((error) => console.error(error))

export const PageDashboardDate: React.FC = () => {
  return (
    <p className="mt-2 text-sm text-gray-700">
      Stand der Daten:
      {date ? (
        <>
          {date.toLocaleDateString('de-DE', { weekday: 'short' })}{' '}
          {date.toLocaleDateString('de-DE')}, {date.toLocaleTimeString('de-DE')}
        </>
      ) : (
        <span className="text-sm text-red-400"> Fehler beim Laden der Daten</span>
      )}
    </p>
  )
}
