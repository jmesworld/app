//@ts-nocheck
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ColorSchemeName } from 'react-native'
import { useStoreState } from '../hooks/storeHooks'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import NotFoundScreen from '../components/NotFound/NotFound'
import { useState, useEffect } from 'react'
import {
  WalletScreen,
  SendScreen,
  RequestScreen,
  ScanScreen,
  TransactionHistoryScreen,
  SendConfirmScreen,
  ReceiveScreen,
} from '../features/Wallet'
import { OnBoardingStack } from './onBoardingStack'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const account = useStoreState((state) => state.accounts[0])
  if (!account) {
    return <OnBoardingStack />
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={WalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Balance"
        component={WalletScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />

      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="WalletSend"
          component={SendScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            title: 'Send to user',
          }}
        />

        <Stack.Screen
          name="WalletSendConfirm"
          component={SendConfirmScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            title: 'Confirm sending to user',
          }}
        />
        <Stack.Screen
          name="WalletReceive"
          component={ReceiveScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            title: 'Receive',
          }}
        />
        <Stack.Screen
          name="ReceiveRequest"
          component={RequestScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            title: 'Request',
          }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
          options={{
            headerShown: false,
            presentation: 'card',
            title: 'Transaction History',
          }}
        />
        <Stack.Screen
          name="Scan"
          options={{ headerShown: false, title: 'Scan QR Code' }}
          component={ScanScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
