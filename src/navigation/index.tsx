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
import { ColorSchemeName, Image } from 'react-native'
import Colors from '../utils/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { useStoreState } from '../hooks/storeHooks'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Header from '../components/Header/Header'
import NotFoundScreen from '../components/NotFound/NotFound'
import TestScreen from '../features/TestScreen'
import {
  WalletScreen,
  WalletSendScreen,
  WalletSendConfirmScreen,
  WalletReceiveConfirmScreen,
  WalletReceiveScreen,
  ScanScreen,
  ProfileScreen,
  TransactionHistoryScreen,
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
  console.log('HAS TOKEN', hasToken)

  useStoreState((state) =>
    console.log(`Current store state: ${state}`)
  )

  if (hasToken) {
    console.log('USER AUTHORIZED')
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={WalletScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Root"
          component={TestScreen}
          options={{ headerShown: false }}
        /> */}
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
            component={WalletSendScreen}
            options={{
              headerShown: false,
              presentation: 'card',
              title: 'Send to user',
            }}
          />

          <Stack.Screen
            name="WalletSendConfirm"
            component={WalletSendConfirmScreen}
            options={{
              headerShown: false,
              presentation: 'card',
              title: 'Confirm sending to user',
            }}
          />
          <Stack.Screen
            name="WalletReceive"
            component={WalletReceiveScreen}
            options={{
              headerShown: false,
              presentation: 'card',
              title: 'Receive request',
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
    console.log('USER IS UNAUTHORIZED')
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
            //header: () => <Header navigation={navigation} />, // fix header balance or create new components for onboarding screens
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
