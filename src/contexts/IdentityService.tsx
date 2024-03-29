// Cotnext for user service

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  IdentityserviceClient,
  IdentityserviceQueryClient,
} from '../client/Identityservice.client'
import {
  PUBLIC_RPC_URL,
  PUBLIC_IDENTITY_SERVICE_CONTRACT,
} from '@env'
import { getOfflineSignerProto } from 'cosmjs-utils'
import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { DeliverTxResponse, GasPrice } from '@cosmjs/stargate'
import { BJMES_DENOM, JMES_DENOM } from '../utils/constants'
import { coin } from '@cosmjs/amino'
import { GetIdentityByNameResponse } from '../client/Identityservice.types'

type Identity = GetIdentityByNameResponse

type IdentityServiceContext = {
  identityCache: Record<string, Identity> | null
  setIdentityCache?: React.Dispatch<
    React.SetStateAction<Record<string, Identity> | null>
  >
  identityService: IdentityserviceQueryClient | null
  cosmWasmClient: CosmWasmClient | null
  createWallet: (mnemonic: string) => Promise<{ address: string }>
  createIdentity: (
    mnemonic: string,
    username: string
  ) => Promise<{ username: string; address: string }>
  getBalance: (
    address: string,
    mnemonic: string
  ) => Promise<number | null>
  getAccount: (mnemonic: string) => Promise<{
    address: string
    token: string
    balance: number
    username: string
  } | null>
  sendTransaction: (
    mnemonic: string,
    recipient: string,
    amount: number
  ) => Promise<DeliverTxResponse>
}

const emptyFn = () => {
  throw new Error('Identity service not initialized')
}

const initialState: IdentityServiceContext = {
  identityCache: null,
  identityService: null,
  cosmWasmClient: null,
  createIdentity: emptyFn,
  createWallet: emptyFn,
  getBalance: emptyFn,
  getAccount: emptyFn,
  sendTransaction: emptyFn,
  setIdentityCache: emptyFn,
}

const IdentityContext =
  createContext<IdentityServiceContext>(initialState)

type Props = {
  children?: React.ReactNode
}

const IdentityServiceProvider = ({ children }: Props) => {
  const [cosmWasmClient, setCosmWasmClient] =
    useState<CosmWasmClient | null>(null)
  const [identityCache, setIdentityCache] = useState<Record<
    string,
    Identity
  > | null>(null)
  useEffect(() => {
    async function getCosmWasmClient() {
      try {
        const result = await CosmWasmClient.connect(PUBLIC_RPC_URL)
        setCosmWasmClient(result)
      } catch (err) {
        console.error(err)
      }
      setCosmWasmClient
    }

    getCosmWasmClient()
  }, [])

  const identityQueryClient = useMemo(
    () =>
      cosmWasmClient
        ? new IdentityserviceQueryClient(
            cosmWasmClient,
            PUBLIC_IDENTITY_SERVICE_CONTRACT
          )
        : null,
    [cosmWasmClient]
  )

  const getSigner = useCallback(async (mnemonic: string) => {
    if (!mnemonic) return null
    const signer = await getOfflineSignerProto({
      mnemonic: mnemonic,
      chain: {
        bech32_prefix: 'jmes',
        slip44: 6280,
      },
    })

    const signingClient =
      await SigningCosmWasmClient.connectWithSigner(
        PUBLIC_RPC_URL,
        signer,
        { gasPrice: GasPrice.fromString('0.3ujmes') }
      )
    if (!signingClient || !signer) {
      throw new Error('Invalid mnemonic')
    }

    const addr = (await signer.getAccounts())[0].address
    return {
      signer,
      signingClient,
      addr,
    }
  }, [])

  const sendTransaction = useCallback(
    async (mnemonic: string, recipient: string, amount: number) => {
      if (!cosmWasmClient) return null
      const result = await getSigner(mnemonic)
      if (!result) {
        throw new Error("Couldn't get singer")
      }
      const { signingClient, addr } = result
      if (!signingClient) {
        throw new Error('Could not get signing client')
      }
      const conBalance = coin(amount, JMES_DENOM)
      return signingClient.sendTokens(
        addr,
        recipient,
        [conBalance],
        'auto'
      )
    },
    [cosmWasmClient]
  )

  const getAccount = useCallback(
    async (mnemonic: string) => {
      if (!cosmWasmClient) return null

      const { addr, signingClient } = await getSigner(mnemonic)
      if (!addr || !signingClient) {
        throw new Error('Invalid mnemonic')
      }

      const balance = await signingClient.getBalance(addr, JMES_DENOM)
      const identityClient = new IdentityserviceClient(
        signingClient,
        addr,
        PUBLIC_IDENTITY_SERVICE_CONTRACT
      )
      const identity = await identityClient.getIdentityByOwner({
        owner: addr,
      })

      const account = await signingClient.getAccount(addr)
      const token = account?.pubkey?.value
      return {
        address: addr,
        token: token,
        balance: (Number(balance.amount) || 0) / 1e6,
        username: identity?.identity?.name,
      }
    },

    [cosmWasmClient]
  )

  const getBalance = useCallback(
    async (address: string, mnemonic: string) => {
      if (!cosmWasmClient) return null
      try {
        const { signingClient } = await getSigner(mnemonic)
        const balance = await signingClient.getBalance(
          address,
          JMES_DENOM
        )

        return Number(balance.amount) || 0
      } catch (err) {
        console.error(err)
      }
      return null
    },
    [cosmWasmClient]
  )

  const createWallet = useCallback(
    async (mnemonic: string) => {
      const { addr } = await getSigner(mnemonic)
      return {
        address: addr,
      }
    },
    [identityQueryClient, getSigner]
  )
  const createIdentity = useCallback(
    async (username: string, mnemonic: string) => {
      const { addr, signingClient } = await getSigner(mnemonic)

      const identityClient = new IdentityserviceClient(
        signingClient,
        addr,
        PUBLIC_IDENTITY_SERVICE_CONTRACT
      )

      await identityClient.registerUser({ name: username })
      return {
        address: addr,
        username: username,
      }
    },
    [identityQueryClient, getSigner]
  )
  const value: IdentityServiceContext = {
    identityService: identityQueryClient,
    cosmWasmClient,
    createIdentity,
    createWallet,
    getBalance,
    getAccount,
    sendTransaction,
    identityCache,
    setIdentityCache,
  }

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  )
}

const useIdentityContext = () => useContext(IdentityContext)

export { useIdentityContext, IdentityServiceProvider }
