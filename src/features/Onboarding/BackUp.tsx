import {
  Platform,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useEffect, useState } from 'react'

import { useStoreActions } from '../../hooks/storeHooks'
import { Text, View } from '../../components/Themed/Themed'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  Backdrop,
  Background,
  Input,
  Navbar,
  TextTitle,
  TextInfo,
  StyledButton,
  Checkbox as CheckboxComponent,
} from '../../components'

import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import {
  mnemonic,
  account,
  getToken,
  createUserIdentity,
} from '../../utils'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function BackUpScreen({ navigation, route }: Props) {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [recoveryPhrase, setPhrase] = useState('')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setPhrase(mnemonic)
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
        recoveryPhrase,
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
            size={32}
            color="rgba(112, 79, 247, 0.8)"
          />
        )}
      </TouchableOpacity>
    )
  }

  const SeedList = () => {
    return (
      <ScrollView contentContainerStyle={styles.mnemonicContainer}>
        {mnemonic.split(' ').map((word, index) => (
          <View key={index} style={styles.seedContentContainer}>
            <View style={styles.seedWordContainer}>
              <Text style={styles.seedWordText}>{word}</Text>
            </View>
            <Text style={styles.seedWordNumber}> {index + 1} </Text>
          </View>
        ))}
      </ScrollView>
    )
  }

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar navigation={navigation} children="SignUp" />
        <TextTitle> Backup Recovery Phrase</TextTitle>
        <TextInfo>
          Write down your recovery phrase somewhere safe. If you lose
          or damage this device, it's the only way to recover your
          account.
        </TextInfo>
        <SeedList />
        <View style={{ paddingTop: 30 }} />
        <SafeAreaView style={styles.checkboxContainer}>
          <Checkbox />
          <Text style={styles.text}>
            I confirm I have written down a copy of my recovery phrase
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.buttonContainer}>
          <StyledButton
            enabled={checked}
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
          </StyledButton>
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '93%',
    height: 49,
    marginTop: 42,
    marginBottom: 14,
  },

  textContainer: {
    backgroundColor: 'transparent',
    width: '93%',
    height: 68,
    margin: 'auto',
  },
  checkboxContainer: {
    alignItems: 'center',
    display: 'flex',
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
