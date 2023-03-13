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
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Header from '../components/Header/Header'
import NotFoundScreen from '../screens/NotFound/NotFound'
import ScanScreen from '../screens/Scan/Scan'
import SignUpScreen from '../screens/CreateUser/SignUp'
import BackUpScreen from '../screens/BackUp/BackUp'
import ConfirmScreen from '../screens/Confirm/Confirm'
import ConfirmPinScreen from '../screens/SetPin/ConfirmPin'
import ProfileScreen from '../screens/Profile/Profile'
// import RestoreAccountScreen from '../screens/Restore/RestoreAccount'
import RestoreScreen from '../screens/Restore/Restore'
import RestoreMnemonicScreen from '../screens/Restore/RestoreMnemonic'
import WalletScreen from '../screens/Wallet/Wallet'
import WalletSendScreen from '../screens/WalletSend/WalletSend'
import WalletSendConfirmScreen from '../screens/WalletSendConfirm/WalletSendConfirm'
import WalletReceiveScreen from '../screens/WalletReceive/WalletReceive'
import WalletReceiveConfirmScreen from '../screens/WalletReceiveConfirm/WalletReceiveConfirm'
import OnboardingScreen from '../screens/Onboarding/Onboarding'
import SetPinScreen from '../screens/SetPin/SetPin'

import { useStoreState } from '../hooks/storeHooks'

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
          component={BottomTabNavigator}
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
            component={WalletSendScreen}
            options={{ presentation: 'card', title: 'Send to user' }}
          />

          <Stack.Screen
            name="WalletSendConfirm"
            component={WalletSendConfirmScreen}
            options={{
              presentation: 'card',
              title: 'Confirm sending to user',
            }}
          />
          <Stack.Screen
            name="WalletReceive"
            component={WalletReceiveScreen}
            options={{
              presentation: 'card',
              title: 'Receive request',
            }}
          />
          <Stack.Screen name="Scan" component={ScanScreen} />
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

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      style={{ backgroundColor: '#000', height: '100%' }}
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        style={{ backgroundColor: '#000', height: '100%' }}
        component={WalletScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#222',
          tabBarInactiveBackgroundColor: '#000',

          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
          header: () => <Header navigation={navigation} />,
        })}
      />

      <BottomTab.Screen
        name="Scanner"
        style={{ backgroundColor: '#000' }}
        component={ScanScreen}
        options={({ navigation }: RootTabScreenProps<'Scanner'>) => ({
          title: 'Scanner',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#222',
          tabBarInactiveBackgroundColor: '#000',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="scanner" color={color} />
          ),
          header: () => <Header navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="Profile"
        style={{ backgroundColor: '#000' }}
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          title: 'Profile',
          tabBarLabel: '',
          tabBarActiveBackgroundColor: '#222',

          tabBarInactiveBackgroundColor: '#000',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account" color={color} />
          ),
          header: () => <Header navigation={navigation} />,
        })}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props: { name: string; color: string }) {
  const style = { width: 30, height: 30, marginLeft: 5 }
  switch (props.name) {
    case 'home':
      return (
        <Image
          source={require('../assets/icons/home.png')}
          style={style}
        />
      )
      break

    case 'scanner':
      return (
        <Image
          source={require('../assets/icons/scan_white.png')}
          style={style}
        />
      )
      break
    case 'account':
      return (
        <Image
          source={require('../assets/icons/account_icon.png')}
          style={style}
        />
      )
      break
  }

  // @ts-ignore
  return (
    <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
  )
}
