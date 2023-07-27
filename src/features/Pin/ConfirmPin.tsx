import { Route } from '@react-navigation/native'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  PinInput,
  Background,
  BackdropSmall,
  Button,
} from '../../components'
import { Text, View } from '../../components/Themed/Themed'
import {
  useStoreActions,
  useStoreState,
} from '../../hooks/storeHooks'
import { validatePin, navigateToScreen } from '../../utils'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'

import {
  OnBoardingNavigate,
  OnBoardingRoute,
} from '../../navigation/onBoardingStack'
type Props = {
  navigation: OnBoardingNavigate<'confirmPin'>
  route: OnBoardingRoute<'confirmPin'>
}

const ConfirmPinScreen = ({ navigation, route }: Props) => {
  const mnemonic = useStoreState((state) => state.onBoarding.mnemonic)
  const balance = useStoreState((state) => state.onBoarding.balance)
  const username = useStoreState((state) => state.onBoarding.username)
  const address = useStoreState(
    (state) => state.onBoarding.accountAddress
  )

  const [creatingWallet, setCreatingWallet] = useState(false)
  const [pinNumbers, setPinNumbers] = useState<string[]>([
    '',
    '',
    '',
    '',
  ])
  const [pin, setPin] = useState<string[]>(['', '', '', ''])
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)

  const addAccount = useStoreActions((actions) => actions.addAccount)

  useEffect(() => {
    if (route.params) {
      setPinNumbers(route.params.pinNumbers)
    }
  }, [route.params])

  //handles the pin input from current screen
  const isPinComplete = useMemo(() => {
    return pin.every((value) => value !== '')
  }, [pin])

  //handles the countdown
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1000)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsLocked(false)
      setAttempts(0)
    }
  }, [remainingTime, setIsLocked])

  const performRegister = async () => {
    try {
      await addAccount({
        index: 0,
        title: 'default',
        address: address,
        username: username,
        mnemonic: mnemonic,
        balance: balance,
        pin: pin,
      })
      await navigateToScreen(navigation, 'Root', {
        screen: 'Balance',
        params: {},
      })
    } catch (err) {
      console.error(err)
    }
  }

  // implement countdown and make sure button stays disabled
  const handleError = () => {
    const MAX_ATTEMPTS = 3
    const LOCKOUT_DURATION = 1 * 30 * 1000 // 30 seconds in milliseconds

    if (attempts < MAX_ATTEMPTS) {
      setErrorText('PIN does not match')
    } else {
      setErrorText(
        'Too many failed attempts. Please try again later.'
      )
      setIsLocked(true)
      setTimeout(() => {
        setIsLocked(false)
        setAttempts(0)
        setErrorText('')
        setRemainingTime(LOCKOUT_DURATION)
      }, LOCKOUT_DURATION)
    }
  }

  const handleSubmit = async () => {
    setCreatingWallet(true)
    const isPinValid = validatePin({
      pin,
      pinNumbers,
      setAttempts,
      setIsLocked,
      attempts,
      setRemainingTime,
    })

    if (isPinValid) {
      await performRegister()
    } else {
      handleError()
    }
    setCreatingWallet(false)
  }

  return (
    <View style={styles.container}>
      <Background>
          <Navbar
            navigation={navigation}
            children="createPin"
            />
            <BackdropSmall>
          <View style={styles.centeredContainer}>
            <TextTitle> Please confirm your PIN </TextTitle>
            <TextInfo>
              Please retype your 4 digit PIN and confirm.
            </TextInfo>
          </View>
          <PinInput
            onChange={(newPin) => {
              setPin(newPin)
            }}
          />
          <View style={styles.centeredContainer}>
            {attempts > 0 && !isLocked && (
              <Text style={styles.errorText}>{errorText}</Text>
            )}
            {isLocked && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  You have been locked out for 30 seconds.
                </Text>
                <Text style={styles.errorText}>
                  Remaining: {remainingTime / 1e3} seconds
                </Text>
              </View>
            )}
          </View>
          <SafeAreaView style={styles.buttonContainer}>
            <Button
              loading={creatingWallet}
              disabled={
                !(isPinComplete && !isLocked) || creatingWallet
              } // Disable button if user is locked out
              onPress={handleSubmit}
            >
              <Text
                style={{
                  textTransform: 'none',
                  fontStyle: 'normal',
                  color: '#FCFCFD',
                  fontSize: 16,
                  fontWeight: '700',
                }}
              >
                Confirm
              </Text>
            </Button>
          </SafeAreaView>
        </BackdropSmall>
      </Background>
    </View>
  )
}

export default memo(ConfirmPinScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  centeredContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: '#FF5876',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  errorContainer: {
    marginTop: 97,
    marginBottom: 17,
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '93%',
    height: 49,
    marginTop: 42,
    marginBottom: 54,
  },
})
