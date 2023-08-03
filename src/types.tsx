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
  Root: undefined
  Send: {
    address: string;
    amount: string;
  }
  SendToAddress: {
    username: string;
    address: string;
    amount: string;
  }
  SendConfirm: {
    recipientAddress: string;
    username: string;
    amount: string;
  }
  ActiveRequest: {
    amount: string
  }
  NotFound: undefined
  Balance: undefined
  Receive: undefined
  ReceiveRequest: undefined
  TransactionHistory: undefined
  Scan: undefined
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
  timestamp?: number
  conversion?: string
  to_address?: string
  from_address?: string
  denom?: string
  tx_type?: string
  body: {
    messages: {
      to_address: string
      from_address: string
      amount: [
        {
          denom: string
          amount: number
        }
      ]
    }[]
  }
}

export type Transactions = {
  transactions: Transaction[]
  tx_responses: any
  txs: any
}
