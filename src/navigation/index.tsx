/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
//@ts-nocheck

import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import Colors from '../utils/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { useStoreState } from '../hooks/storeHooks'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'

import NotFoundScreen from '../components/NotFound/NotFound'

import {
  WalletScreen,
  SendScreen,
  RequestScreen,
  ScanScreen,
  ProfileScreen,
  TransactionHistoryScreen,
  SendConfirmScreen,
  ReceiveScreen,
} from '../features/Wallet'
import {
  OnboardingScreen,
  SignUpScreen,
  BackUpScreen,
  ConfirmScreen,
} from '../features/Onboarding'

import {
  RestoreScreen,
  RestoreMnemonicScreen,
} from '../features/Restore'

import { SetPinScreen, ConfirmPinScreen } from '../features/Pin'

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
  const hasToken = useStoreState((state) => state.hasToken)

  if (hasToken) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={WalletScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oops!' }}
        />
        <Stack.Screen
          name="SetPin"
          component={SetPinScreen}
          options={{ headerShown: false }}
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
  } else {
    return (
      <Stack.Navigator
        style={{ backgroundColor: '#000', height: '100%' }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          style={{ backgroundColor: '#000', height: '100%' }}
          component={SignUpScreen}
          options={{
            headerShown: false,
            title: 'SignUp',
          }}
        />
        <Stack.Screen
          name="BackUp"
          style={{ backgroundColor: '#000', height: '100%' }}
          component={BackUpScreen}
          options={{ headerShown: false, title: 'BackUp' }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{ headerShown: false, title: 'Confirm' }}
        />

        <Stack.Screen
          name="SetPin"
          component={SetPinScreen}
          options={{ headerShown: false, title: 'SetPin' }}
        />
        <Stack.Screen
          name="ConfirmPin"
          component={ConfirmPinScreen}
          options={{ headerShown: false, title: 'ConfirmPin' }}
        />
        <Stack.Screen
          name="Restore"
          component={RestoreScreen}
          options={{ headerShown: false, title: 'Restore' }}
        />
        <Stack.Screen
          name="RestoreMnemonic"
          component={RestoreMnemonicScreen}
          options={{ headerShown: false, title: 'RestoreMnemonic' }}
        />
      </Stack.Navigator>
    )
  }
}
