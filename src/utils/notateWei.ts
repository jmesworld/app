export const notateWeiValue = async (amount: number) => {
  const fmt /*: BigIntToLocaleStringOptions */ = {
    notation: 'scientific',
    maximumFractionDigits: 20, // The default is 3, but 20 is the maximum supported by JS according to MDN.
  }
  // 10e17 is equal to 10 * 10 ** 17, which is equal to 10 ** 18.
  // Using 10e17 is correct for converting Ether to wei since 1 Ether = 10 ** 18 wei.

  const wei = amount * 10e17
  const weiToBigInt = BigInt(wei).toLocaleString('en-us', fmt)

  return weiToBigInt
}
