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
import { useIdentityContext } from '../../contexts/IdentityService'
import { OnBoardingPhase } from '../../store'
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
  const [loadingAccount, setLoadingAccount] = useState(false)
  const { getAccount } = useIdentityContext()

  const setMnemonic = useStoreActions(
    (actions) => actions.setMnemonic
  )
  const setBalance = useStoreActions((actions) => actions.setBalance)
  const setOnboardingPhase = useStoreActions(
    (actions) => actions.setOnboardingPhase
  )
  const setAccountAddress = useStoreActions(
    (actions) => actions.setAccountAddress
  )
  const setUsername = useStoreActions(
    (actions) => actions.setUsername
  )

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

  const handleAccountRestore = async () => {
    try {
      setLoadingAccount(true)
      const { balance, token, address, username } = await getAccount(
        mnemonicWords.join(' ')
      )

      if (!address) {
        handleLockout()
        return
      }

      setMnemonic(mnemonicWords)
      setAccountAddress(address)
      if (balance === undefined) {
        setOnboardingPhase(OnBoardingPhase.topUp)
        navigation.push('topUp')
      }
      if (username === undefined) {
        setOnboardingPhase(OnBoardingPhase.pickUsername)
        navigation.push('pickUsername')
      }
      setBalance(balance)

      setUsername(username)
      setOnboardingPhase(OnBoardingPhase.createPin)
      navigation.push('createPin')

      await Promise.all([
        storage.setSecureItem('mnemonic', mnemonicWords.join(' ')),
        storage.setSecureItem('token', token),
      ])
      setHasToken(true)
    } catch (err) {
      console.error(err)
    }
    setLoadingAccount(false)
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
            loading={loadingAccount}
            disabled={!canConfirm || isLocked || loadingAccount}
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
