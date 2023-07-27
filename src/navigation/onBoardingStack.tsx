import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import {
  WelcomeScreen,
  PickUsernameScreen,
  GenerateMnemonic,
  ConfirmMnemonic,
  TopUpScreen,
} from '../features/Onboarding'
import { SetPinScreen, ConfirmPinScreen } from '../features/Pin'
import {
  RestoreScreen,
  RestoreMnemonicScreen,
} from '../features/Restore'
import { useStoreState } from '../hooks/storeHooks'
import { OnBoardingPhase } from '../store'
import { useMemo } from 'react'

type Keys = keyof typeof OnBoardingPhase
type Stack = {
  [key in Keys]: undefined | { pinNumbers: string[] }
}

const Stack = createNativeStackNavigator<Stack>()

export type OnBoardingNavigate<
  T extends keyof typeof OnBoardingPhase
> = NativeStackScreenProps<Stack, T>['navigation']

export type OnBoardingRoute<T extends keyof typeof OnBoardingPhase> =
  NativeStackScreenProps<Stack, T>['route']

export const OnBoardingStack = () => {
  const { accountAddress, balance, username, pin } = useStoreState(
    (state) => state.onBoarding
  )

  const initialRouteName = useMemo(() => {
    if (!accountAddress) return 'welcome'
    if (!balance) return 'topUp'
    if (!username) return 'pickUsername'
    if (!pin) return 'createPin'
    return 'welcome'
  }, [accountAddress, balance, username, pin])

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="generateMnemonic"
        component={GenerateMnemonic}
        options={{ headerShown: false, title: 'BackUp' }}
      />
      <Stack.Screen
        name="confirmGeneratedMnemonic"
        component={ConfirmMnemonic}
        options={{ headerShown: false, title: 'Confirm' }}
      />
      <Stack.Screen
        name="topUp"
        component={TopUpScreen}
        options={{ headerShown: false, title: 'Confirm' }}
      />

      <Stack.Screen
        name="pickUsername"
        component={PickUsernameScreen}
        options={{
          headerShown: false,
          title: 'SignUp',
        }}
      />
      <Stack.Screen
        name="createPin"
        component={SetPinScreen}
        options={{ headerShown: false, title: 'SetPin' }}
      />
      <Stack.Screen
        name="confirmPin"
        component={ConfirmPinScreen}
        options={{ headerShown: false, title: 'ConfirmPin' }}
      />

      <Stack.Screen
        name="restoreMnemonic"
        component={RestoreMnemonicScreen}
        options={{ headerShown: false, title: 'RestoreMnemonic' }}
      />
    </Stack.Navigator>
  )
}
