//working

const ALEX_L1_IDENTITY_API_ENDPOINT = 'http://51.38.52.37:3001'
const ALEX_L1_FAUCET_API_ENDPOINT = 'http://51.38.52.37:1889'
const ALEX_L1_LCDC = {
  chainID: 'jmes-888',
  URL: 'http://51.38.52.37:1888',
  isClassic: false,
}

const client = new Client({
  providers: {
    faucetAPI: {
      endpoint: {
        api_url: ALEX_L1_FAUCET_API_ENDPOINT,
      },
    },
    identityAPI: {
      endpoint: {
        api_url: ALEX_L1_IDENTITY_API_ENDPOINT,
      },
    },
    LCDC: ALEX_L1_LCDC,
  },
})

const getCoinBal = async (address: string) => {
  const [coins] = await client.providers.LCDC.bank?.balance(address)
  const ujmesBalance =
    parseFloat(coins.get('ujmes')?.toData()?.amount) / 1e6 // 1 JMES = 1e6 uJMES

  return ujmesBalance
}

//not working

//   const getCoinBal = async (address: string) => {
//   const [coins] = await lcdc.bank.balance(address)
//   const ujmesBalance =
//     parseFloat(coins.get('ujmes')?.toData()?.amount) / 1e6 || 0 // 1 JMES = 1e6 uJMES

//   return ujmesBalance
// }

// const getCoinBal = async (address: string) => {
//   try {
//     console.log({
//       hadLCDC: !!lcdc,
//       hasBank: !!lcdc.bank,
//       hasFun: !!lcdc.bank.balance,
//     })
//     const [coins] = await lcdc.bank.balance(address)
//     const ujmesBalance =
//       parseFloat(coins.get('ujmes')?.toData()?.amount) / 1e6 || 0 // 1 JMES = 1e6 uJMES

//     return ujmesBalance
//   } catch (error) {
//     // Handle the error here, such as logging it or returning a default value
//     console.error('Error getting coin balance:', error)
//     return 0
//   }
// }

// const getCoinBal = async (address: string) => {
//   try {
//     const balance = (await account.getBalance(address)).toData()
//       ?.amount
//     console.log({ balance })

//     return parseFloat(balance) / 1e6
//   } catch (error) {
//     // const [coins] = await lcdc.bank.balance(address)
//     setTimeout(async () => {
//       console.log('====')
//       const lcdc = await account.getLCDClient()
//       console.log(address)
//       console.log(await lcdc.bank.balance(address))
//       console.log(lcdc)
//     }, 5)
//     console.log(error)
//     console.error('Error getting coin balance:', error)
//     return 0
//   }
// }
