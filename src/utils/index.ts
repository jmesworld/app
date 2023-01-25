/* eslint-disable no-case-declarations */
import 'react-native-get-random-values'
import * as bip39 from 'bip39'
import { Client, Mnemonic } from 'jmes'
import { convertToEur } from './convert'
import { notateWeiValue } from './notateWei'

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

const randomBytes = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = Mnemonic.generateMnemonic(randomBytes)
const wallet = client.createWallet(new Mnemonic(mnemonic))
const account = wallet.getAccount()
const lcdc = client.createLCDClient({
  chainID: 'jmes-888',
  URL: 'http://51.38.52.37:1888',
  isClassic: false,
})

/* Test identities

    ACCOUNT #1:
    address: jmes199kwsjs3j3up2uwqkn37j5lu0up68z2zepuw8z
    username: zzxxxx
    name: zzxxxx
    mnemonic: eye dinner tuna mirror select build glimpse add parade record guilt scare visit imitate between syrup siege coach knee bread glory call news crunch
    
    
    ACCOUNT #2:
    address: jmes126c9dh4n523u9l9tefgxamgpm0fns7urtq3c5c
    username: Hunter
    name: HunterSides
    mnemonic: absorb casual spread danger change document fatal chair doctor taxi marine fat evolve prison film vault million oil agent leg panda sketch stadium impose
    

    */

/*Wallet */
const generateWallet = async (mnemonic: string) => {
  const wallet = await client.createWallet(new Mnemonic(mnemonic))

  return wallet
}
const getCoinBal = async (address: string) => {
  const [coins] = await lcdc.bank.balance(address)
  const balance = coins.get('ujmes')?.amount?.d[0]

  return balance || 0
}
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
  const wallet = await client.createWallet(new Mnemonic(mnemonic))
  const account = await wallet.getAccount()
  console.log({ address, amount, mnemonic })
  console.log({ account })
  console.log({ wallet })

  const res = await account.sendTransaction(
    {
      recipientAddress: address,
      recipientAmount: amount,
    }
    //'http://51.38.52.37:1317'
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

const getUserIdentity = async (identityName: string) => {
  const getIdentityReq =
    await client.providers.identityAPI.getIdentity(identityName)
  console.log({ getIdentity: getIdentityReq })
  return getIdentityReq
}

const restoreUserIdentity = async (mnemonic: string) => {
  const account = await accountFromMnemonic(mnemonic)
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
}
