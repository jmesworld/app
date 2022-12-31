/* eslint-disable no-case-declarations */
import 'react-native-get-random-values'
import * as bip39 from 'bip39'
import { Client, Mnemonic } from 'jmes'
import { convertToEur } from './convert'
import { notateWeiValue } from './notateWei'
import { useStoreActions } from '../hooks/storeHooks'
//import { secureStorage } from '../store'
import { secureStorage } from '../store/localStorage'
const SCHEMA_PREFIX = 'jmes:'
const client = new Client()
const randomBytes = crypto.getRandomValues(new Uint8Array(32))
const mnemonic = Mnemonic.generateMnemonic(randomBytes)
const wallet = client.createWallet(new Mnemonic(mnemonic)) //used to login/restore account,just pass in user entered mnemonic
const account = wallet.getAccount()
const lcdc = client.createLCDClient({
  chainID: 'jmes-888',
  URL: 'http://51.38.52.37:1888',
  isClassic: false,
})

/* Test identities
    ACCOUNT #1:
    address: jmes1w5znszpw7nj8ujm34nkcheaerxx5gf8zz0swmg
    mnemonic: tube survey urban eight hawk museum cat broken castle ladder key fitness oblige trash oven diary decorate strike powder concert acid stone sugar steak
  
    ACCOUNT #2:
    address: jmes1acm2q0uqtwx2ne5eevm57yumghamr0wt8hsscm
    mnemonic: allow lonely point minor shoe chapter account position eagle green royal bundle first rifle slide elbow parent rescue bright tree produce inmate blouse stable 
*/

/*Storage */
const storeInLocal = async (identity: any, mnemonic?: string) => {
  await useStoreActions((actions) => actions.addUser)({
    username: identity.username,
    signature: identity.account.signature,
  })
  await useStoreActions((actions) => actions.addWallet)({
    mnemonic: mnemonic,
    privateKey: identity.account.privateKey,
  })
  await useStoreActions((actions) => actions.addAccount)({
    index: 0,
    title: 'default',
    address: identity.account.address,
  })
  await useStoreActions((actions) => actions.addToken)({
    token: await getToken(identity.account.response), // getToken returns tokenReq.data
  })

  // await useStoreActions((actions) => actions.setSecureToken({
  //   token: await getToken(identity.account.response)
  // }))
  // await secureStorage.encryptToken(
  //   await getToken(identity.account.response)
  // )

  return identity
}

/*Wallet */
const getCoinBal = async (address: string) => {
  const [coins] = await lcdc.bank.balance(address)
  const balance = coins.get('ujmes')?.amount?.d[0]

  return balance || 0
}
const sendTransaction = async (address: string, amount: number) => {
  try {
    const res = await account.sendTransaction({
      recipientAddress: address,
      recipientAmount: amount,
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

/*Identity*/
const createUserIdentity = async (username: string, account: any) => {
  const createIdentityReq =
    await client.providers.identityAPI.createIdentity(
      username,
      account
    )
  console.log(`CreateIdentity Request: ${createIdentityReq}`)
  return createIdentityReq
}
const getUserIdentity = async (identityName: string) => {
  const getIdentityReq =
    await client.providers.identityAPI.getIdentity(identityName)

  return getIdentityReq
}
const restoreUserIdentity = async (mnemonic: string) => {
  const account = await accountFromMnemonic(mnemonic)
  const tokenRes = await getToken(account.response)
  const { username } = tokenRes.identity

  const identity = { username, account }

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
  console.log(account)
  console.log(`Token Request${tokenReq}`)
  console.log(`Token Request.data${tokenReq.data}`)
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
  storeInLocal,
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
