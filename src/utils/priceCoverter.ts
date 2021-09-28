export const nanoToRaw = (priceInNano: number): number => {
  return Math.floor(priceInNano * Math.pow(10, 30))
}

export const rawToNano = (priceInRaw: number): number => {
  return priceInRaw / Math.pow(10, 30)
}
