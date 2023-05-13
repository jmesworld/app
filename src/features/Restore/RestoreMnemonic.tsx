import { Route } from '@react-navigation/native'

import { useEffect, useState } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  SeedList,
  Background,
  Backdrop,
} from '../../components'
import { navigateToScreen, restoreUserIdentity } from '../../utils'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
import storage from '../../store/storage'
import { useLockout } from '../../hooks/customHooks'
import { useContext } from 'react'
import { AuthContext } from '../../app/AuthProvider'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function RestoreMnemonicScreen({
  navigation,
  route,
}: Props) {
  const {
    attempts,
    isLocked,
    remainingTime,
    errorText,
    setAttempts,
    setIsLocked,
    setRemainingTime,
    setErrorText,
  } = useLockout(0)
  const { setHasToken } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(
    Array(12).fill('')
  )
  const addAccount = useStoreActions((actions) => actions.addAccount)

  useEffect(() => {
    if (route.params) {
      setUsername(route.params.username)
    }
  }, [route.params])

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

  const handleLockout = () => {
    const LOCKOUT_DURATION = 1 * 30 * 1000 // 30 seconds in milliseconds
    const MAX_ATTEMPTS = 3
    if (attempts < MAX_ATTEMPTS) {
      setErrorText('Invalid mnemonic ')
      setAttempts(attempts + 1)
      console.log('attempts', attempts)
    } else {
      setErrorText(
        'Too many failed attempts. Please try again later.'
      )
      setIsLocked(true)
      setTimeout(() => {
        setIsLocked(false)
        setAttempts(0)
      }, LOCKOUT_DURATION)
      setRemainingTime(LOCKOUT_DURATION)
    }
  }

  const restoreIdentity = async () => {
    const identity = await restoreUserIdentity(
      mnemonicWords.join(' ')
    )

    return identity
  }

  const createAccount = async (identity) => {
    await addAccount({
      index: 0,
      title: 'default',
      address: identity.account.address,
      username: identity.username,
    })
  }

  const handleAccountRestore = async () => {
    const identity = await restoreIdentity()

    if (!identity) {
      handleLockout()
      return
    }

    await Promise.all([
      createAccount(identity),
      storage.setSecureItem('mnemonic', mnemonicWords.join(' ')),
      storage.setSecureItem('token', identity.token),
    ])
    setHasToken(true)
  }

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="Restore"
        />
        <TextTitle> Confirm Recovery Phrase </TextTitle>
        <TextInfo>
          Confirm the following words from your recovery phrase
        </TextInfo>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <SeedList
            mnemonicWords={mnemonicWords}
            setMnemonicWords={setMnemonicWords}
          />

          {attempts > 0 && !isLocked && (
            <Text style={styles.errorText}>{errorText}</Text>
          )}
          {isLocked && (
            <Text style={styles.errorText}>
              You have been locked out for 30 seconds.
            </Text>
          )}
          <View style={{ paddingTop: 30, backgroundColor: 'none' }} />

          <SafeAreaView style={styles.buttonContainer}>
            <StyledButton
              enabled={true}
              onPress={async () => {
                await handleAccountRestore()
              }}
            >
              <Text>Confirm</Text>
            </StyledButton>
          </SafeAreaView>
        </ScrollView>
      </Backdrop>
    </Background>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  errorText: {
    color: '#FF5876',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '93%',
    height: 49,
    marginTop: 42,
  },
})
