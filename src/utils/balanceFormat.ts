export const formatBalance = (
  balance: number | string,
  isMicroJMES = true
) => {
  if (typeof balance === 'string' && isNaN(Number(balance))) {
    return 0
  }
  const balanceNumber =
    typeof balance === 'string' ? parseFloat(balance) : balance
  return (balanceNumber /( isMicroJMES ? 1e6 : 1)).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    }
  )
}

export const convertToUSD = (balance: number | string) => {
  if (typeof balance === 'string' && isNaN(Number(balance))) {
    return 0
  }
  const balanceNumber =
    typeof balance === 'string' ? parseFloat(balance) : balance
  return (balanceNumber * 0.3).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  })
}

export const formatUSDFromJMES = (
  balance: number | string,
  isMicroJMES = true
) => {
  const balanceNumber =
    typeof balance === 'string' ? parseFloat(balance) || 0 : balance
  const convertedBalance = convertToUSD(
    isMicroJMES ? balanceNumber / 1e6 : balanceNumber
  )
  return `≈ ${convertedBalance} USD`
}
