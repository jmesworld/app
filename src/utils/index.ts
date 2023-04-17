/* eslint-disable no-case-declarations */
import 'react-native-get-random-values'
import * as bip39 from 'bip39'
import { Client, Mnemonic, Account, DerivableKey } from 'jmes'
import { convertToEur } from './convert'
import { notateWeiValue } from './notateWei'
import { validatePin } from './validatePin'
import { navigateToScreen } from './navigate'
import { handleLockout } from './lockout'

const SCHEMA_PREFIX = 'jmes:'
const client = new Client({
  providers: {
    faucetAPI: {
      endpoint: {
        api_url: 'http://51.38.52.37:1889',
      },
    },
    identityAPI: {
      endpoint: {
        api_url: 'http://51.38.52.37:3001',
      },
    },
    // marketplaceAPI: {
    //   endpoint: {
    //     api_url: 'http://51.38.52.37:1317',
    //   },
    // },
    // lcdClient: {
    //   endpoint: {
    //     api_url: 'http://51.38.52.37:26657',
    //   },
    // },
  },
})

const randomBytes = crypto.getRandomValues(new Uint8Array(16))
const mnemonic = Mnemonic.generateMnemonic(randomBytes)
const wallet = client.createWallet(new Mnemonic(mnemonic))
const account = wallet.getAccount()
const lcdc = client.createLCDClient({
  chainID: 'jmes-888',
  URL: 'http://51.38.52.37:1888',
  isClassic: false,
})

/*Wallet */

const generateWallet = async (mnemonic: string) => {
  const wallet = await client.createWallet(new Mnemonic(mnemonic))

  return wallet
}

// const generateMnemonic = () => {
//   const randomBytes = crypto.getRandomValues(new Uint8Array(32))
//   const mnemonic = Mnemonic.generateMnemonic(randomBytes)

//   return mnemonic
// }
const faucetRequest = async (address: string) => {
  const res = await client.providers.faucetAPI.requestCredit(address)
  console.log(res)
  return res
}

const getCoinBal = async (address: string) => {
  const [coins] = await lcdc.bank.balance(address)
  const ujmesBalance =
    parseFloat(coins.get('ujmes')?.toData()?.amount) / 1e6 || 0 // 1 JMES = 1e6 uJMES

  return ujmesBalance
}

const sendTransaction = async (
  address: string,
  amount: number,
  mnemonic: string
) => {
  const wallet = client.createWallet(new Mnemonic(mnemonic))
  const account = wallet.getAccount()
  const res = await account.sendTransaction(
    {
      recipientAddress: address,
      recipientAmount: amount, // 1 JMES = 1e6 uJMES
    },
    'http://51.38.52.37:1888'
  )

  console.log({ res })
  return res
}

/*Identity*/
const createUserIdentity = async (username: string, account: any) => {
  const createIdentityReq =
    await client.providers.identityAPI.createIdentity(
      username,
      account
    )
  console.log(`CreateIdentity Request: ${createIdentityReq}`)
  console.log({ createIdentity: createIdentityReq })
  console.log({ createIdentity: createIdentityReq.data })
  return createIdentityReq
}

// const getUserIdentity = async (identityName: string) => {
//   try {
//     const identity = await client.providers.identityAPI.getIdentity(identityName)
//     return identity
//   } catch (error) {
//     console.log(error)
//     return error
//   }
// }
const getUserIdentity = async (identityName: string) => {
  const identity = await client.providers.identityAPI.getIdentity(
    identityName
  )
  return identity
}
// const restoreUserIdentity = async (mnemonic: string) => {
//   const account = await accountFromMnemonic(mnemonic)
//   console.log(account) // will log the account object even if the account is invalid
//   if (account) {
//     try {
//       const tokenRes = await getToken(account.response)
//       const { username } = tokenRes.identity
//       const identity = { username, account, token: tokenRes.token }
//       return identity
//     } catch (error) {
//       console.log('ERROR', error)
//     }
//   } else {
//     console.log('ERROR')
//   }
// }
const restoreUserIdentity = async (mnemonic: string) => {
  const account = await accountFromMnemonic(mnemonic)
  console.log(account) // will log the account object even if the account is invalid

  const tokenRes = await getToken(account.response)
  const { username } = tokenRes.identity
  const identity = { username, account, token: tokenRes.token }
  return identity
}

/*Auth */
const accountFromMnemonic = async (mnemonic: string) => {
  const wallet = client.createWallet(new Mnemonic(mnemonic))
  const response = wallet.getAccount()
  const publicKey = response.getPublic()
  const message = 'jmesworld'
  const signedMessage = response.signMessage(message)
  const isVerified = response.verifySignature(
    signedMessage,
    message,
    publicKey
  )
  const signature = { signedMessage, isVerified }
  const account = {
    response,
    signature,
    address: response.getAddress(),
    privateKey: response.getPrivate(),
    publicKey: response.getPublic(),
  }

  return account
}

const getToken = async (account?: any) => {
  const tokenReq = await client.providers.identityAPI.getToken(
    account
  )
  console.log(tokenReq)
  return tokenReq.data
}
/*Marketplace */
const getFeed = async (token: any) => {
  const feed = await client.providers.marketplaceAPI.getFeed({
    token,
  })
  console.log(feed)

  return feed
}

const postItemVote = async (
  identifier: string,
  direction: number,
  token: any
) => {
  const vote = await client.providers.marketplaceAPI.postItemVote(
    { identifier: '82f182ddbef3d7b80bafc06ee9e4a664', direction: 1 },
    { token }
  )
  console.log(vote)

  return vote
}

const mnemonicToSeed = async (mnemonic: string) => {
  const seed = await bip39.mnemonicToSeedSync(mnemonic)

  return seed.toString('hex')
}

export {
  mnemonic,
  wallet,
  account,
  lcdc,
  SCHEMA_PREFIX,
  faucetRequest,
  convertToEur,
  getCoinBal,
  sendTransaction,
  postItemVote,
  getFeed,
  getToken,
  createUserIdentity,
  getUserIdentity,
  restoreUserIdentity,
  notateWeiValue,
  mnemonicToSeed,
  validatePin,
  navigateToScreen,
  handleLockout,
}
