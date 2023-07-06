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
import storage from './storage'
import * as SecureStore from 'expo-secure-store'
import { useStoreState } from '../hooks/storeHooks'
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
  mnemonic: string[]
  pin: string[]
}
export interface Identity {
  address: string
  username: string
  publicKey: string
}
export interface WalletModel<K> {
  wallet: Generic<K>
  token: Generic<K>
  identity: Generic<K>
  accounts: Account[]
  hasWallet: Computed<WalletModel<K>, Wallet | false>
  hasToken: Computed<WalletModel<K>, Token | false>
  addPasscode: Action<WalletModel<K>, K>
  addWallet: Action<WalletModel<K>, K>
  addUser: Action<WalletModel<K>, K>
  addToken: Action<WalletModel<K>, K>
  addIdentity: Action<WalletModel<K>, K>
  updateAccount: Action<WalletModel<K>, K>
  resetStore: Action<WalletModel<K>, K>
  addAccount: Action<WalletModel<K>, K>
}

const store = createStore<WalletModel>(
  persist(
    {
      wallet: generic({}),
      token: generic({}),
      identity: generic({}),
      app: generic({}),
      user: generic({}),
      accounts: [],
      hasWallet: computed(
        //verifies wallet by checking wallet & account length in storage
        (state) =>
          Object.keys(state.wallet).length !== 0 &&
          state.accounts.length !== 0
      ),
      //verifies token in localstorage (need to move to secure storage and set expiration) & account length
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
      addIdentity: action((state, payload) => {
        state.identity = {
          address: payload.address,
          publicKey: payload.publicKey,
          username: payload.username,
        }
      }),
      addToken: action((state, payload) => {
        state.token = {
          token: payload.token,
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
          pin: payload.pin,
        })
      }),
      removeAccount: action((state, payload) => {
        state.accounts = state.accounts.filter(
          (account) => account.address !== payload.address
        ) // remove account from accounts array
      }),
      setSecureToken: action((state, payload) => {
        state.token = {
          token: SecureStore.setItemAsync(
            'secure_token',
            JSON.stringify(payload.token)
          ),
        }
      }),
      getSecureToken: action((state, payload) => {
        state.token = {
          token: SecureStore.getItemAsync('secure_token'),
        }
      }),
    },
    {
      storage: storage, // app does not work without this
    }
  )
)

export default store
