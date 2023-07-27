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
import { getClient } from '../lib/createUser'
import { getOfflineSignerProto } from 'cosmjs-utils'
import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { useMnemonicContext } from './MnemonicContext'

type IdentityServiceContext = {
  identityService: IdentityserviceQueryClient | null
  cosmWasmClient: CosmWasmClient | null
  createWallet: (
    mnemonic: string
  ) => Promise<{ username: string; address: string }>
  createIdentity: (
    username: string
  ) => Promise<{ username: string; address: string }>
}

const emptyFn = () => {
  throw new Error('Identity service not initialized')
}

const initialState: IdentityServiceContext = {
  identityService: null,
  cosmWasmClient: null,
  createIdentity: emptyFn,
  createWallet: emptyFn,
}

const IdentityContext =
  createContext<IdentityServiceContext>(initialState)

type Props = {
  children?: React.ReactNode
}
const IdentityServiceProvider = ({ children }: Props) => {
  const [cosmWasmClient, setCosmWasmClient] =
    useState<CosmWasmClient | null>(null)
  const { mnemonic } = useMnemonicContext()

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

  const client = useMemo(async () => {
    return (await getClient()) as any
  }, [getClient])

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

  const getSigner = useCallback(async () => {
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

    const addr = (await signer.getAccounts())[0].address
    return {
      signer,
      signingClient,
      addr,
    }
  }, [mnemonic])

  const createWallet = useCallback(
    async (username) => {
      const { addr, signingClient } = await getSigner()
      return {
        address: addr,
        username: username,
      }
    },
    [identityQueryClient, getSigner]
  )
  const createIdentity = useCallback(
    async (username) => {
      const { addr, signingClient } = await getSigner()

      // const identityClient = new IdentityserviceClient(
      //   signingClient,
      //   addr,
      //   PUBLIC_IDENTITY_SERVICE_CONTRACT
      // )

      // await identityClient.registerUser({ name: username })

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
  }

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  )
}

const useIdentityContext = () => useContext(IdentityContext)

export { useIdentityContext, IdentityServiceProvider }
