export const keyToName = (key: string) => {
  return key
    .split('_')
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}
