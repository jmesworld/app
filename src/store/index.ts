import {
  Computed,
  computed,
  createStore,
  action,
  Action,
  persist,
} from 'easy-peasy'
import storage from './storage'
import * as SecureStore from 'expo-secure-store'
import secureStore from './secure'
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
  derivationPath?: string
  mnemonic: string[]
  pin: string[]
}
export interface Identity {
  address: string
  username: string
  publicKey: string
}

export enum OnBoardingPhase {
  'none' = 'none',
  'welcome' = 'welcome',
  'generateMnemonic' = 'generateMnemonic',
  'confirmGeneratedMnemonic' = 'confirmGeneratedMnemonic',
  'topUp' = 'topUp',
  'pickUsername' = 'pickUsername',
  'createPin' = 'createPin',
  'confirmPin' = 'confirmPin',
  'restoreMnemonic' = 'restoreMnemonic',
}
export interface OnBoarding {
  onBoardingPhase: OnBoardingPhase
  mnemonic: string[] | null
  balance: number | null
  accountAddress: string | null
  username: string | null
  pin: string | null
}

export interface WalletModel {
  // onboarding
  onBoarding?: OnBoarding
  setOnboardingPhase: Action<WalletModel, OnBoardingPhase>
  setMnemonic: Action<WalletModel, string[]>
  setBalance: Action<WalletModel, number>
  setAccountAddress: Action<WalletModel, string>
  setUsername: Action<WalletModel, string>
  setPin: Action<WalletModel, string>

  wallet?: Wallet
  token?: Token
  app?: App
  user?: User
  identity?: Identity
  accounts?: Account[]
  hasWallet: Computed<WalletModel, boolean>
  hasToken: Computed<WalletModel, boolean>
  addPasscode: Action<WalletModel, App>
  addWallet: Action<WalletModel, Wallet>
  addUser: Action<WalletModel, User>
  addToken: Action<WalletModel, Token>
  addIdentity: Action<WalletModel, Identity>
  updateAccount: Action<WalletModel, Account>
  resetStore: Action<WalletModel, boolean>
  addAccount: Action<WalletModel, Account>

  removeAccount: Action<
    WalletModel,
    {
      address: string
    }
  >
  setSecureToken: Action<WalletModel, Token>
  getSecureToken: Action<WalletModel, Token>
}

const store = createStore<WalletModel>(
  persist(
    {
      wallet: undefined,
      token: undefined,
      identity: undefined,
      app: undefined,
      user: undefined,
      accounts: [],

      onBoarding: {
        onBoardingPhase: OnBoardingPhase.none,
        mnemonic: null,
        balance: null,
        accountAddress: null,
        username: null,
        pin: null,
      },
      setOnboardingPhase: action((state, payload) => {
        state.onBoarding = {
          ...state.onBoarding,
          onBoardingPhase: payload,
        }
      }),
      setMnemonic: action((state, payload) => {
        state.onBoarding = {
          ...state.onBoarding,
          mnemonic: payload,
        }
      }),
      setBalance: action((state, payload) => {
        state.onBoarding = {
          ...state.onBoarding,
          balance: payload,
        }
      }),
      setAccountAddress: action((state, payload) => {
        state.onBoarding = {
          ...state.onBoarding,
          accountAddress: payload,
        }
      }),
      setUsername: action((state, payload) => {
        state.onBoarding = {
          ...state.onBoarding,
          username: payload,
        }
      }),
      setPin: action((state, payload) => {
        state.onBoarding = {
          ...state.onBoarding,
          pin: payload,
        }
      }),

      hasWallet: computed(
        //verifies wallet by checking wallet & account length in storage
        (state) =>
          state.wallet &&
          Object.keys(state.wallet).length !== 0 &&
          state.accounts.length !== 0
      ),
      //verifies token in localstorage (need to move to secure storage and set expiration) & account length
      hasToken: computed(
        (state) =>
         state.token && Object.keys(state.token).length !== 0 &&
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
          state.wallet = undefined
          state.token = undefined
          state.app = undefined
          state.user = undefined
          state.accounts = []
          state.onBoarding = {
            onBoardingPhase: OnBoardingPhase.none,
            balance: undefined,
            accountAddress: undefined,
            username: undefined,
            mnemonic: undefined,
            pin: undefined,
          }
        }
        secureStore.removeDataSecurely('secure_token')
        secureStore.removeDataSecurely('secure_token')
        secureStore.removeDataSecurely('mnemonic')
      }),
      addAccount: action((state, payload) => {
        state.accounts.push({
          index: payload.index,
          title: payload.title,
          address: payload.address,
          username: payload.username,
          balance: payload.balance,
          mnemonic: payload.mnemonic,
          derivationPath: 'bip44Change',
          pin: payload.pin,
        })
      }),
      removeAccount: action((state, payload) => {
        state.accounts = state?.accounts.filter(
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
