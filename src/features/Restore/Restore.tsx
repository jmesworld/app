import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed/Themed'

import {
  Backdrop,
  Background4,
  Input,
  Navbar,
  StyledButton,
  TextTitle,
} from '../../components'

import { getUserIdentity } from '../../utils'
import { Navigation } from '../../types'

type Props = {
  navigation: Navigation
}
export default function RestoreScreen({ navigation }: Props) {
  const [username, onChangeUsername] = useState('')
  const [name, onChangeName] = useState('')

  const validateUsername = async function () {
    try {
      const account = await getUserIdentity(username)
      if (account.data.identity.username === username) {
        console.log('valid username', account.data.identity.username)
        return true
      } else {
        console.log(
          'invalid username',
          account.data.identity.username
        )
        return false
      }
    } catch (error) {
      console.log('error', error)
      return false
    }
  }

  const handleRestore = async function () {
    const isValid = await validateUsername()
    if (isValid) {
      // @ts-ignore
      return navigation.navigate({
        name: 'RestoreMnemonic',
        params: {
          username,
          name,
        },
      })
    } else {
      alert('Username does not exist')
    }
    return false
  }

  return (
    <Background4>
      <Backdrop>
        <Navbar navigation={navigation} children="Onboarding" />
        <TextTitle> Restore </TextTitle>

        <Text style={styles.inputTag}>USERNAME</Text>
        <SafeAreaView style={styles.inputContainer}>
          <Input
            placeholder=""
            onChangeText={onChangeUsername}
            value={username}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.buttonContainer}>
          <StyledButton
            enabled={username.length >= 5}
            onPress={async () => {
              await handleRestore()
            }}
          >
            <Text>Restore</Text>
          </StyledButton>
        </SafeAreaView>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>
            By signing up you agree to our Terms, Privacy Policy and
            Cookies Policy
          </Text>
        </View>
      </Backdrop>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Background4>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flex: 1,
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: 44,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: '#FCFCFD',
    borderRadius: 24,
  },

  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: 19,
    marginBottom: 28,
    width: '100%',
    maxWidth: 356,
    height: 20,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: '#704FF7',
    textAlign: 'center',
  },

  inputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '93%',
    height: 49,
    marginBottom: 22,
  },
  inputTag: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 7,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#704FF7',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    width: '93%',

    height: 49,
    backgroundColor: 'none',
  },

  policyContainer: {
    backgroundColor: 'transparent',
    width: '72%',
    height: 56,
    marginTop: 47,
  },
  policyText: {
    fontSize: 14,
    color: '#0F0056',
  },
})
