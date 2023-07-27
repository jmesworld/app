import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Text, View } from '../../components/Themed/Themed'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Backdrop,
  Background,
  TextTitle,
  TextInfo,
  StyledButton,
  Checkbox as CheckboxComponent,
  SeedList,
  Button,
} from '../../components'

import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import { mnemonic as mnemonicPhreses } from '../../utils'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import { useMnemonicContext } from '../../contexts/MnemonicContext'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function BackUpScreen({ navigation, route }: Props) {
  const { mnemonic, setMnemonic } = useMnemonicContext()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setMnemonic(mnemonicPhreses)
    if (route.params) {
      if (route.params.username) setUsername(route.params.username)
      if (route.params.name) setName(route.params.name)
    }
  }, [route.params])

  const handleConfirm = async () => {
    // @ts-ignore
    return navigation.navigate({
      name: 'Confirm',
      params: {
        username,
        name,
        recoveryPhrase: mnemonic,
      },
    })
  }
  const Checkbox = () => {
    return (
      <TouchableOpacity
        onPress={() => setChecked(!checked)}
        style={styles.uncheckedCheckbox}
      >
        {checked && (
          <Ionicons
            name="ios-checkmark"
            size={30}
            color="rgba(112, 79, 247, 0.8)"
          />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="Onboarding"
        />
        <ScrollView
          contentContainerStyle={styles.mainContentcontnetStyle}
          style={styles.contentContainer}
        >
          <TextTitle> Backup Recovery Phrase</TextTitle>
          <TextInfo>
            Write down your recovery phrase somewhere safe. If you
            lose or damage this device, it's the only way to recover
            your account.
          </TextInfo>
          <SeedList mnemonicWords={mnemonic.split(' ')} readonly />

          <SafeAreaView style={styles.checkboxContainer}>
            <Checkbox />
            <Text style={styles.text}>
              I confirm I have written down a copy of my recovery
              phrase
            </Text>
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView style={styles.buttonContainer}>
          <Button
            mode="contained"
            disabled={!checked}
            onPress={async () => {
              await handleConfirm()
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
        {/* Use a light status bar on iOS to account for the black space above the modal */}
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
  buttonContainer: {
    width: '93%',
    height: 49,
    marginTop: 12,
    marginBottom: 34,
  },

  textContainer: {
    backgroundColor: 'transparent',
    width: '93%',
    height: 68,
    margin: 'auto',
  },
  contentContainer: {
    height: '70%',
    width: '100%',
  },

  mainContentcontnetStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '93%',
    height: 40,
  },
  uncheckedCheckbox: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    border: '1px solid rgba(112, 79, 247, 0.5)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(112, 79, 247, 0.5)',
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
    rowGap: 30,
    columnGap: 7,
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
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 12,
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
  },
  seedWordText: {
    color: '#0F0056',
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
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000',
  },
  iconImageView: {
    flexDirection: 'row',
  },
  button: {
    paddingTop: 17,
    paddingBottom: 17,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingLeft: 52,
    paddingRight: 53,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
  input: {
    backgroundColor: '#5B5B5B',
    height: 34,
    borderRadius: 6,
    paddingLeft: 18,
  },
  title: {
    fontSize: 42,
    fontFamily: 'GFSDidot_400Regular',
    color: '#FFF',
  },
  secondTitle: {
    fontSize: 20,
    fontFamily: 'Comfortaa_300Light',
    textTransform: 'uppercase',
    // paddingBottom: 26,
    color: '#FFF',
  },
})
