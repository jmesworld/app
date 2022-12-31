import { Generic, Computed, Action } from 'easy-peasy'

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
