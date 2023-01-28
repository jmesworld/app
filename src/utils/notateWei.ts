export const notateWeiValue = async (amount: number) => {
  const fmt /*: BigIntToLocaleStringOptions */ = {
    notation: 'scientific',
    maximumFractionDigits: 20, // The default is 3, but 20 is the maximum supported by JS according to MDN.
  }
  const wei = amount * 10e17
  const weiToBigInt = BigInt(wei).toLocaleString('en-us', fmt)

  return weiToBigInt
}
