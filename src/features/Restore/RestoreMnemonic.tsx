import { Route } from '@react-navigation/native'

import { useEffect, useMemo, useState } from 'react'
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
  Button,
} from '../../components'
import { navigateToScreen, restoreUserIdentity } from '../../utils'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
import storage from '../../store/storage'
import { useLockout } from '../../hooks/customHooks'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import {
  OnBoardingNavigate,
  OnBoardingRoute,
} from '../../navigation/onBoardingStack'
type Props = {
  navigation: OnBoardingNavigate<'confirmGeneratedMnemonic'>
  route: OnBoardingRoute<'confirmGeneratedMnemonic'>
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
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(
    Array(12).fill('')
  )
  const addAccount = useStoreActions((actions) => actions.addAccount)

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

  const canConfirm = useMemo(() => {
    return mnemonicWords.every((word) => word.length > 0)
  }, [mnemonicWords])

  const setMnemonicWord = (word: string, index: number) => {
    const newMnemonicWords = [...mnemonicWords]
    newMnemonicWords[index] = word
    setMnemonicWords(newMnemonicWords)
  }

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="welcome"
        />
        <ScrollView
          contentContainerStyle={styles.mainContentcontnetStyle}
          style={styles.mainContentContainer}
        >
          <TextTitle> Confirm Recovery Phrase </TextTitle>
          <TextInfo>
            Confirm the following words from your recovery phrase
          </TextInfo>
          <SeedList
            mnemonicWords={mnemonicWords}
            setMnemonicWords={setMnemonicWord}
          />

          {attempts > 0 && !isLocked && (
            <Text style={styles.errorText}>{errorText}</Text>
          )}
          {isLocked && (
            <Text style={styles.errorText}>
              You have been locked out for 30 seconds.
            </Text>
          )}
        </ScrollView>
        <SafeAreaView style={styles.buttonContainer}>
          <Button
            disabled={!canConfirm}
            mode="contained"
            onPress={async () => {
              await handleAccountRestore()
            }}
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
      </Backdrop>
    </Background>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
  },
  errorText: {
    color: '#FF5876',
    fontSize: 14,
    textAlign: 'center',
  },
  mainContentContainer: {
    height: '70%',
    width: '100%',
  },

  mainContentcontnetStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '93%',
    height: 49,
    marginBottom: 34,
    marginTop: 22,
  },
})
