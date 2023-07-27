import { Route } from '@react-navigation/native'
import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  TextInfo,
  TextTitle,
  SeedList,
  Background,
  Backdrop,
  Button,
} from '../../components'
import { Text, View } from '../../components/Themed/Themed'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import {
  useStoreActions,
  useStoreState,
} from '../../hooks/storeHooks'
import { OnBoardingNavigate } from '../../navigation/onBoardingStack'
import { useIdentityContext } from '../../contexts/IdentityService'
import { OnBoardingPhase } from '../../store'

type Props = {
  navigation: OnBoardingNavigate<'confirmGeneratedMnemonic'>
  route: Route<any>
}

export default function ConfirmMnemonic({
  navigation,
  route,
}: Props) {
  const { createWallet } = useIdentityContext()
  const mnemonic = useStoreState((state) => state.onBoarding.mnemonic)
  const [creatingAccount, setCreatingAccount] = useState(false)
  const address = useStoreState(
    (state) => state.onBoarding.accountAddress
  )
  const setAddress = useStoreActions(
    (actions) => actions.setAccountAddress
  )
  const setOnboardingPhase = useStoreActions(
    (actions) => actions.setOnboardingPhase
  )
  const setBalance = useStoreActions(
    (actions) => actions.setBalance
  )
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([])

  useEffect(() => {
    if (!mnemonic) {
      navigation.replace('generateMnemonic')
      return
    }

    setOnboardingPhase(OnBoardingPhase.confirmGeneratedMnemonic)

    // TODO: remove this when ready
    if (__DEV__) {
      setMnemonicWords(mnemonic)
    }
  }, [address, mnemonic])

  const validateInputWords = async () => {
    if (mnemonicWords.join('') === mnemonic.join('')) {
      return true
    }
    return false
  }

  const handleConfirm = async () => {
    const isValid = validateInputWords()
    if (!isValid) {
      Alert.alert('Mnemonic does not match')
    }
    setCreatingAccount(true)
    try {
      const res = await createWallet(mnemonicWords.join(' '))
      setAddress(res.address)
      setBalance(0)
      navigation.push('topUp')
    } catch (err) {
      console.error(err)
    } finally {
      setCreatingAccount(false)
    }
  }

  const setMnemonicWord = (word: string, index: number) => {
    const newMnemonicWords = [...mnemonicWords]
    newMnemonicWords[index] = word
    setMnemonicWords(newMnemonicWords)
  }

  const errors = useMemo(() => {
    if (mnemonicWords.join('') === '') {
      return []
    }
    const errors = []
    mnemonicWords.forEach((word, index) => {
      if (word !== mnemonic[index]) {
        errors.push(index)
      }
    })
    return errors
  }, [mnemonicWords])

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="generateMnemonic"
        />
        <ScrollView
          contentContainerStyle={styles.mainContentcontnetStyle}
          style={styles.contentContainer}
        >
          <View style={styles.centeredContainer}>
            <TextTitle>Confirm Recovery Phrase</TextTitle>
            <TextInfo>
              Confirm the following words from your recovery phrase
            </TextInfo>
          </View>
          <SeedList
            mnemonicWords={mnemonicWords}
            setMnemonicWords={setMnemonicWord}
            errors={errors}
          />
        </ScrollView>
        <SafeAreaView style={styles.buttonContainer}>
          <Button
            loading={creatingAccount}
            mode="contained"
            disabled={
              errors.length > 0 ||
              mnemonicWords.join('') === '' ||
              creatingAccount
            }
            onPress={handleConfirm}
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
              Sign up
            </Text>
          </Button>
        </SafeAreaView>
      </Backdrop>
    </Background>
  )
}

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
  contentContainer: {
    height: '70%',
    width: '100%',
  },

  mainContentcontnetStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    height: 49,
    width: '93%',
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 45,
  },
  centeredText: {
    textAlign: 'center',
  },
})
