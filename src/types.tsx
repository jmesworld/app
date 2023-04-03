/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
}

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type Navigation = {
  navigate: (scene: string) => void
}

export type Transaction = {
  status?: string
  tx_hash?: string
  symbol?: React.ReactNode
  amount?: any
  timestamp?: string
  conversion?: string
  to_address?: string
  from_address?: string
  denom?: string
  tx_type?: string
}

export type Transactions = {
  transactions: Transaction[]
  tx_responses: any
  txs: any
}
