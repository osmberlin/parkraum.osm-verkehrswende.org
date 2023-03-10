import type { Position } from '@turf/turf'

export const atlasUrl = (center: Position) => {
  return `https://radverkehrsatlas.de/regionen/parkraum?lat=${center[1]}&lng=${center[0]}`
}
