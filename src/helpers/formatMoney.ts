export const formatUSD = (string: string | null) => {
  if(!string) return ''
  return `$${new Intl.NumberFormat('en-GB').format(parseFloat(string))}`
}

export const formatEUR = (string: string | null) => {
  if(!string) return ''
  return  `€${new Intl.NumberFormat('en-GB').format(parseFloat(string))}`
}
