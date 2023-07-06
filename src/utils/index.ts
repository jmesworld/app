/* eslint-disable no-case-declarations */
import 'react-native-get-random-values'
import * as bip39 from 'bip39'
import { Client, Mnemonic, Account, DerivableKey } from 'jmes'
import { convertToEur } from './convert'
import { notateWeiValue } from './notateWei'
import { validatePin } from './validatePin'
import { navigateToScreen } from './navigate'
import { handleLockout } from './lockout'
// const lcdc = client.createLCDClient({
//   chainID: 'jmes-888',
//   URL: 'http://51.38.52.37:1888',
//   isClassic: false,
// })

// const lcdc = client.createLCDClient({
//   chainID: 'jmes-testnet-1',
//   URL: 'http://164.92.191.45:1317',
//   isClassic: false,
// })
const SCHEMA_PREFIX = 'jmes:'
const MAYOREE_L1_ENDPOINT = 'http://164.92.191.45:1317'
const ALEX_L1_IDENTITY_API_ENDPOINT = 'http://51.38.52.37:3001'
const ALEX_L1_FAUCET_API_ENDPOINT = 'http://51.38.52.37:1889'

const MAYOREE_L1_LCDC = {
  chainID: 'jmes-testnet-1',
  URL: 'http://164.92.191.45:1317',
  isClassic: false,
}
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

const randomBytes = crypto.getRandomValues(new Uint8Array(16))
const mnemonic = Mnemonic.generateMnemonic(randomBytes)
const wallet = client.createWallet(new Mnemonic(mnemonic))
const account = wallet.getAccount()
const lcdc = account.getLCDClient()

//working
const getCoinBal = async (address: string) => {
  const [coins] = await client.providers.LCDC.bank?.balance(address)
  const ujmesBalance =
    parseFloat(coins.get('ujmes')?.toData()?.amount) / 1e6 // 1 JMES = 1e6 uJMES

  return ujmesBalance || 0 // return 0 if no balance
}

/*Wallet */

const faucetRequest = async (address: string) => {
  const res = await client.providers.faucetAPI.requestCredit(address)
  console.log(res)
  return res
}
const sendTransaction = async (
  address: string,
  amount: number,
  mnemonic: string
) => {
  const wallet = client.createWallet(new Mnemonic(mnemonic))
  const account = wallet.getAccount()
  const res = await account.sendTransaction({
    recipientAddress: address,
    recipientAmount: amount, // 1 JMES = 1e6 uJMES - RecipientAmount is uJMES
  })

  console.log({ res })
  return res
}

/*Identity*/
const createUserIdentity = async (username: string, account: any) => {
  // try {
  //   const createIdentityReq =
  //     await client.providers.identityAPI.createIdentity(
  //       username,
  //       account
  //     )
  //   console.log(`CreateIdentity Request: ${createIdentityReq}`)
  //   console.log({ createIdentity: createIdentityReq })
  //   console.log({ createIdentity: createIdentityReq.data })
  //   return createIdentityReq
  // } catch (error) {
  //   console.error(error)
  // }
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

const getUserIdentity = async (identityName: string) => {
  const identity = await client.providers.identityAPI.getIdentity(
    identityName
  )
  return identity
}

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
  getToken,
  createUserIdentity,
  getUserIdentity,
  restoreUserIdentity,
  notateWeiValue,
  validatePin,
  navigateToScreen,
  handleLockout,
}
