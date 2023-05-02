import { Route } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  Backdrop,
  Background4,
  Input,
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  SeedList,
} from '../../components'
import {
  account,
  createUserIdentity,
  getToken,
  navigateToScreen,
  restoreUserIdentity,
  handleLockout,
} from '../../utils'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
import { storeDataSecurely } from '../../store/storage'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function RestoreMnemonicScreen({
  navigation,
  route,
}: Props) {
  const [username, setUsername] = useState('')
  const [mnemonicWords, setMnemonicWords] = useState<string[]>( // initialized with 12 empty strings
    Array.from({ length: 12 }, () => '')
  )
  const [remainingTime, setRemainingTime] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [errorText, setErrorText] = useState('')
  const [isLocked, setIsLocked] = useState(false)
  const addAccount = useStoreActions((actions) => actions.addAccount)
  const addToken = useStoreActions((actions) => actions.addToken)

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

  // need to redirect to create pin screen after restore before root?
  const handleAccountRestore = async () => {
    try {
      const identity = await restoreUserIdentity(
        mnemonicWords.join(' ')
      )

      if (identity) {
        await addAccount({
          index: 0,
          title: 'default',
          address: identity.account.address,
          username: identity.username,
        })

        await storeDataSecurely('mnemonic', mnemonicWords.join(' '))
        await storeDataSecurely('token', identity.token)
        await addToken({
          token: identity.token,
        })
        navigateToScreen(navigation, 'Root', {})
      }
    } catch (error) {
      console.log(error)
      handleLockout()
    }
  }
  return (
    <Background4>
      <Backdrop>
        <Navbar navigation={navigation} children="Restore" />
        <TextTitle> Confirm Recovery Phrase </TextTitle>
        <TextInfo>
          Confirm the following words from your recovery phrase
        </TextInfo>

        <SeedList
          mnemonicWords={mnemonicWords}
          setMnemonicWords={setMnemonicWords}
        />

        <View style={{ paddingTop: 30 }} />

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
            enabled={!isLocked} // Disable button if user is locked out
            disabled={isLocked} // Disable button if pin is incomplete or user is locked out
            onPress={async () => {
              await handleAccountRestore()
            }}
          >
            <Text>Confirm</Text>
          </StyledButton>
        </SafeAreaView>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Backdrop>
    </Background4>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    width: '93%',
    height: 49,
    marginTop: 42,
    marginBottom: 14,
  },

  mnemonicContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    height: 352,
    marginTop: 44,
    marginBottom: 52,
    paddingLeft: 9,
    paddingRight: 9,
  },
  seedContentContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'transparent',
    height: 64,
  },
  seedWordContainer: {
    minWidth: 108,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  seedWordText: {
    color: '#0F0056',
    fontSize: 14,
    fontWeight: '400',
  },
  seedWordTextSelected: {
    color: '#FCFCFD',
    fontSize: 14,
    fontWeight: '400',
  },

  seedWordNumber: {
    color: '#704FF7',
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: '#0F0056',
    paddingLeft: 10,
    paddingRight: 43,
  },
})
