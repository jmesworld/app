import {
  Generic,
  generic,
  Computed,
  computed,
  createStore,
  action,
  Action,
  persist,
} from "easy-peasy";
import storage from "../storage";
import { useStoreState } from "../hooks/storeHooks";

export interface IQRCodePayload {
  prefix?: string;
  address?: string;
  username?: string;
  amount?: string | number;
  data?: any;
  url?: string;
  function?: string;
  chain_id?: string;
}
export interface ImagePayload {
  username?: string;
  address?: string;
  title?: string;
  price?: string | number;
  shares?: string | number;
  uri?: string;
}

export interface User {
  username: string;
  signature: string;
}
export interface App {
  passcode: number;
}
export interface Wallet {
  mnemonic: string[];
  seed: string;
  privateKey: string;
}

export interface Account {
  index: number;
  title: string;
  address: string;
  username: string;
  balance: number;
  derivationPath: string;
}

export interface WalletModel<K> {
  wallet: Generic<K>;
  accounts: Account[];
  hasWallet: Computed<WalletModel<K>, Wallet | false>;
  addPasscode: Action<WalletModel<K>, K>;
  addWallet: Action<WalletModel<K>, K>;
  addUser: Action<WalletModel<K>, K>;
  updateAccount: Action<WalletModel<K>, K>;
  resetStore: Action<WalletModel<K>, K>;
  addAccount: Action<WalletModel<K>, K>;
}

const store = createStore<WalletModel>(
  persist(
    {
      wallet: generic({}),
      app: generic({}),
      user: generic({}),
      accounts: [],
      hasWallet: computed(
        (state) =>
          Object.keys(state.wallet).length !== 0 && state.accounts.length !== 0
      ),
      addPasscode: action((state, payload) => {
        state.app = {
          passcode: payload.passcode,
        };
      }),
      addUser: action((state, payload) => {
        state.user = {
          username: payload.username,
          signature: payload.signature,
        };
      }),
      addWallet: action((state, payload) => {
        state.wallet = {
          mnemonic: payload.mnemonic,
          seed: payload.seed,
          privateKey: payload.privateKey,
        };
      }),
      updateAccount: action((state, payload) => {
        console.log({ state });
        console.log({ accounts: state.accounts });
        console.log({ account0: state.accounts[0] });
        console.log(useStoreState((state) => state.accounts));
        if (!payload.index || !state.accounts[payload.index]) {
          console.error({ payload });
          throw new Error(`No account index ${payload.index}`);
        }
        state.accounts[payload.index] = {
          ...state.accounts[payload.index],
          ...payload,
        };
      }),
      resetStore: action((state, payload) => {
        const forceReset = payload === true;

        if (forceReset) {
          state.wallet = {};
          state.app = {};
          state.user = {};
          state.accounts = [];
        }
      }),
      addAccount: action((state, payload) => {
        state.accounts.push({
          index: payload.index,
          title: payload.title,
          address: payload.address,
          username: payload.username,
          balance: 0,
          derivationPath: "bip44Change",
        });
      }),
    },
    {
      storage: storage,
    }
  )
);

export default store;
