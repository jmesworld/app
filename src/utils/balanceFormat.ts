export const formatBalance = (balance: number | string) => {
  if (typeof balance === 'string' && isNaN(Number(balance))) {
    return 0
  }
  const balanceNumber =
    typeof balance === 'string' ? parseInt(balance) : balance
  return (balanceNumber / 1e6).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  })
}

export const convertToUSD = (balance: number | string) => {
  const formattedBalance = formatBalance(balance)
  return (Number(formattedBalance) * 0.3).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  })
}
