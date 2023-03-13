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
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [inputWord, setInputWord] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [amount, setWordAmount] = useState(Number)
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
      // @ts-ignore
      return navigation.navigate({
        name: 'SetPin',
        params: {
          username: username,
          name: name,
        },
      })
    } else {
      alert('Invalid mnemonic')
    }
  }

  return (
    <Background4>
      <Backdrop>
        <Navbar navigation={navigation} children="BackUp" />
        <TextTitle> Confirm Recovery Phrase </TextTitle>
        <TextInfo>
          Confirm the following words from your recovery phrase
        </TextInfo>

        <SeedList
          mnemonicWords={mnemonicWords}
          setMnemonicWords={setMnemonicWords}
        />
        <View style={{ paddingTop: 30 }} />

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
    gap: '30px 7px',
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
