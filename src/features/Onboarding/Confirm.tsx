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
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  SeedList,
  SignUpBackground,
} from '../../components'
import { Text, View } from '../../components/Themed/Themed'
import { Navigation } from '../../types'

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
      const words = route.params.recoveryPhrase.split(' ') // split the mnemonic phrase into an array of words (used for comparison)
      setMnemonicWords(Array.from({ length: words.length }, () => '')) // initialize array with empty strings for each word in the mnemonic phrase (used for input)
      setMnemonic(route.params.recoveryPhrase) // set the mnemonic phrase to the state variable mnemonic (used for comparison)
      setName(route.params.name)
      setUsername(route.params.username)
      console.log(route.params.recoveryPhrase)
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
    <SignUpBackground>
      <Navbar navigation={navigation} children="BackUp" />
      <TextTitle> Confirm Recovery Phrase </TextTitle>
      <TextInfo>
        Confirm the following words from your recovery phrase
      </TextInfo>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SeedList
          mnemonicWords={mnemonicWords}
          setMnemonicWords={setMnemonicWords}
        />
        <View
          style={{ paddingTop: 30, backgroundColor: 'translucent' }}
        />

        <SafeAreaView style={styles.buttonContainer}>
          <StyledButton
            enabled={true}
            onPress={async () => {
              await handleConfirm()
            }}
          >
            <Text>Confirm</Text>
          </StyledButton>
        </SafeAreaView>
      </ScrollView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SignUpBackground>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 30,
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
