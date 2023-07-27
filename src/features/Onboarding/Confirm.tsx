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
  BackdropSmall,
  Button,
} from '../../components'
import { Text, View } from '../../components/Themed/Themed'
import { Navigation } from '../../types'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function ConfirmScreen({ navigation, route }: Props) {
  const [mnemonic, setMnemonic] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([])

  useEffect(() => {
    if (route.params && route.params.recoveryPhrase) {
      const words = route.params.recoveryPhrase.split(' ')
      setMnemonicWords(Array.from({ length: words.length }, () => ''))
      setMnemonic(route.params.recoveryPhrase)
      setName(route.params.name)
      setUsername(route.params.username)

      // Auto-populate mnemonic during development
      if (__DEV__) {
        setMnemonicWords(words)
      }
    }
  }, [route.params])

  const validateInputWords = async () => {
    if (mnemonicWords.join(' ') === mnemonic) {
      // compare the input words to the mnemonic phrase
      return true
    } else {
      alert('Mnemonic does not match')
    }
    return false
  }

  const handleConfirm = async () => {
    const isValid = await validateInputWords()
    if (isValid) {
      // setMnemonicContext(mnemonic)
      console.log(mnemonic)
      // @ts-ignore

      return navigation.navigate({
        name: 'SignUp',
        params: {
          username: username,
          name: name,
          recoveryPhrase: mnemonic,
        },
      })
    }
    /**implement attempt counter here */
    // } else {
    //   alert('Invalid mnemonic')
    // }
  }

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar navigation={navigation} children="BackUp" />
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
            setMnemonicWords={setMnemonicWords}
          />
        </ScrollView>
        <SafeAreaView style={styles.buttonContainer}>
          <Button
            mode="contained"
            disabled={false}
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
