export const atlasUrl = (region: string, center: [number, number] | number[]) => {
  if (region === 'berlin') {
    // We have a special case for Berlin where we use a different region with has additional public data from the city administration associated
    return `https://radverkehrsatlas.de/regionen/parkraum-berlin?lat=${center[1]}&lng=${center[0]}`
  }
  return `https://radverkehrsatlas.de/regionen/parkraum?lat=${center[1]}&lng=${center[0]}`
}
