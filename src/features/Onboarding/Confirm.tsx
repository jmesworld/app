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
      // @ts-ignore
      return navigation.navigate({
        name: 'SetPin',
        params: {
          username: username,
          name: name,
          recoveryPhrase: mnemonic,
        },
      })
    } else {
      alert('Invalid mnemonic')
    }
  }

  return (
    <View style={styles.container}>
      <Background>
        <BackdropSmall>
          <OnboardingNavbar
            navigation={navigation}
            children="BackUp"
          />
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
          <View
            style={{
              paddingTop: 30,
              backgroundColor: 'translucent',
            }}
          />
          <SafeAreaView style={styles.buttonContainer}>
            <StyledButton
              enabled={true}
              onPress={async () => {
                await handleConfirm()
              }}
            >
              <Text style={styles.centeredText}>Confirm</Text>
            </StyledButton>
          </SafeAreaView>
        </BackdropSmall>
      </Background>
    </View>
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

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '93%',
    height: 49,
    marginTop: 42,
  },
  centeredText: {
    textAlign: 'center',
  },
})
