import { Route } from '@react-navigation/native'
import React, { memo, useEffect, useState } from 'react'
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
import { useMnemonic } from '../../app/MnemonicContext'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
import {
  account,
  getToken,
  createUserIdentity,
  validatePin,
  navigateToScreen,
} from '../../utils'
import storage from '../../store/storage'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import { useIdentityContext } from '../../contexts/IdentityService'
import { useMnemonicContext } from '../../contexts/MnemonicContext'
type Props = {
  navigation: Navigation
  route: Route<any>
}

const ConfirmPinScreen = ({ navigation, route }: Props) => {
  const { createIdentity } = useIdentityContext()
  const { mnemonic } = useMnemonicContext()
  const [creatingWallet, setCreatingWallet] = useState(false)
  const [pinNumbers, setPinNumbers] = useState<string[]>([
    '',
    '',
    '',
    '',
  ])
  const [pin, setPin] = useState<string[]>(['', '', '', ''])
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [isPinComplete, setIsPinComplete] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)

  const addAccount = useStoreActions((actions) => actions.addAccount)
  const addToken = useStoreActions((actions) => actions.addToken)

  //handles the created pin from the previous screen
  useEffect(() => {
    console.log(pinNumbers)
    if (route.params) {
      setName(route.params.name)
      setUsername(route.params.username)
      setPinNumbers(route.params.pinNumbers)
    }
  }, [route.params])

  //handles the pin input from current screen
  useEffect(() => {
    setIsPinComplete(pin.every((value) => value !== ''))
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
      const result = await createIdentity(mnemonic, username)
      await addAccount({
        index: 0,
        title: 'default',
        address: result.address,
        username: result.username,
        pin: pin,
      })
      await navigateToScreen(navigation, 'Root', {
        screen: 'Balance',
        params: {},
      })
    } catch (err) {
      console.error(err)
    }
    // await createIdentity(mnemonic, username)
    // const tokenRes = await getToken(account)

    // await addAccount({
    //   index: 0,
    //   title: 'default',
    //   address: tokenRes.identity.address,
    //   username: tokenRes.identity.username,
    //   name: tokenRes.identity.name,
    //   pin: pin,
    // })
    // await storage.setSecureItem('mnemonic', mnemonic)
    // await storage.setSecureItem('token', tokenRes.token)
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
        <BackdropSmall>
          <OnboardingNavbar
            navigation={navigation}
            children="SetPin"
          />
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
