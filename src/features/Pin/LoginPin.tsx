import { Route } from '@react-navigation/native'
import React, { memo, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  Backdrop,
  Background,
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  PinInput,
  BackdropSmall,
} from '../../components'
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
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
type Props = {
  navigation: Navigation
  route: Route<any>
}

const LoginPinScreen = ({ navigation, route }: Props) => {
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
  const setSecureToken = useStoreActions(
    (actions) => actions.setSecureToken
  )
  useEffect(() => {
    if (route.params) {
      setName(route.params.name)
      setUsername(route.params.username)
      setPinNumbers(route.params.pinNumbers)
    }
  }, [route.params])

  useEffect(() => {
    setIsPinComplete(pin.every((value) => value !== ''))
  }, [pin])
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
    await createUserIdentity(username, account)
    const tokenRes = await getToken(account)

    await addAccount({
      index: 0,
      title: 'default',
      address: tokenRes.identity.address,
      username: tokenRes.identity.username,
      name: tokenRes.identity.name,
      pin: pin,
    })
    await setSecureToken({
      token: tokenRes.token,
    })
    await addToken({
      token: tokenRes.token,
    })
  }
  const handleSubmit = async () => {
    const LOCKOUT_DURATION = 1 * 30 * 1000 // 30 seconds in milliseconds
    const MAX_ATTEMPTS = 3
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
      navigateToScreen(navigation, 'Root', {})
    } else if (attempts < MAX_ATTEMPTS) {
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

  return (
    <View style={styles.container}>
      <Background>
        <BackdropSmall>
          <OnboardingNavbar
            navigation={navigation}
            children="SetPin"
          />{' '}
          <View style={styles.centeredContainer}>
            <TextTitle> Please confirm your PIN </TextTitle>
            <TextInfo>
              Please retype your 4 digit PIN and confirm.
            </TextInfo>
          </View>
          <PinInput pinNumbers={pin} setPinNumbers={setPin} />
          {attempts > 0 && !isLocked && (
            <Text style={styles.errorText}>{errorText}</Text>
          )}
          {isLocked && (
            <Text style={styles.errorText}>
              You have been locked out for 30 seconds.
            </Text>
          )}
          <SafeAreaView style={styles.buttonContainer}>
            <StyledButton
              enabled={isPinComplete && !isLocked} // Disable button if user is locked out
              disabled={!isPinComplete || isLocked} // Disable button if pin is incomplete or user is locked out
              onPress={handleSubmit}
            >
              <Text>Confirm</Text>
            </StyledButton>
          </SafeAreaView>
        </BackdropSmall>
      </Background>
    </View>
  )
}

export default memo(LoginPinScreen)
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
    marginTop: 97,
    marginBottom: 17,
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
    marginBottom: 14,
  },
})
