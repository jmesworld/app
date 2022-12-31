import {
  Generic,
  generic,
  Computed,
  computed,
  createStore,
  action,
  Action,
  persist,
} from 'easy-peasy'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

export interface IQRCodePayload {
  prefix?: string
  address?: string
  username?: string
  amount?: string | number
  data?: any
  url?: string
  function?: string
  chain_id?: string
}
export interface ImagePayload {
  username?: string
  address?: string
  title?: string
  price?: string | number
  shares?: string | number
  uri?: string
}

export interface User {
  username: string
  signature: string
}
export interface UserIdentity {
  username: string
  account: any
}
export interface App {
  passcode: number
}
export interface Wallet {
  mnemonic: string[]
  seed: string
  privateKey: string
}
export interface Token {
  token: any
}
export interface Account {
  index: number
  title: string
  address: string
  username: string
  balance: string | number
  derivationPath: string
}

export interface WalletModel<K> {
  wallet: Generic<K>
  token: Generic<K>
  accounts: Account[]
  hasWallet: Computed<WalletModel<K>, Wallet | false>
  hasToken: Computed<WalletModel<K>, Token | false>
  addPasscode: Action<WalletModel<K>, K>
  addWallet: Action<WalletModel<K>, K>
  addUser: Action<WalletModel<K>, K>
  updateAccount: Action<WalletModel<K>, K>
  resetStore: Action<WalletModel<K>, K>
  addAccount: Action<WalletModel<K>, K>
}

const store = createStore<WalletModel>(
  persist({
    wallet: generic({}),
    token: generic({}),
    app: generic({}),
    user: generic({}),
    accounts: [],
    hasWallet: computed(
      //verifies wallet by checking wallet & account length in storage
      (state) =>
        Object.keys(state.wallet).length !== 0 &&
        state.accounts.length !== 0
    ),
    //verifies token in localstorage (need to move to secure storage)
    hasToken: computed(
      (state) =>
        Object.keys(state.token).length !== 0 &&
        state.accounts.length !== 0
    ),

    addPasscode: action((state, payload) => {
      state.app = {
        passcode: payload.passcode,
      }
    }),
    addUser: action((state, payload) => {
      state.user = {
        username: payload.username,
        signature: payload.signature,
      }
    }),
    addWallet: action((state, payload) => {
      state.wallet = {
        mnemonic: payload.mnemonic,
        seed: payload.seed,
        privateKey: payload.privateKey,
      }
    }),
    addToken: action((state, payload) => {
      state.token = {
        token: payload.token,
      }
    }),
    setSecureToken: action((state, payload) => {
      state.token = {
        token: SecureStore.setItemAsync('secure_token', payload),
      }
    }),
    getSecureToken: action((state, payload) => {
      state.token = {
        token: SecureStore.getItemAsync('secure_token'),
      }
    }),
    updateAccount: action((state, payload) => {
      if (!state.accounts[payload.index]) {
        console.error({ payload })
        throw new Error(`No account index ${payload.index}`)
      } else {
        state.accounts[payload.index] = {
          ...state.accounts[payload.index],
          ...payload,
        }
      }
    }),
    resetStore: action((state, payload) => {
      const forceReset = payload === true

      if (forceReset) {
        state.wallet = {}
        state.token = {}
        state.app = {}
        state.user = {}
        state.accounts = []
      }
    }),
    addAccount: action((state, payload) => {
      state.accounts.push({
        index: payload.index,
        title: payload.title,
        address: payload.address,
        username: payload.username,
        balance: payload.balance,
        derivationPath: 'bip44Change',
      })
    }),
  })
)

export default store
