import { useEffect, useState } from 'react'
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Keyboard,
} from 'react-native'
import { Text, View } from '../../components/Themed/Themed'

import {
  Input,
  Navbar,
  Background,
  StyledButton,
  TextTitle,
  Backdrop,
} from '../../components'

import { getUserIdentity } from '../../utils'
import { Navigation } from '../../types'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'

type Props = {
  navigation: Navigation
}
export default function RestoreScreen({ navigation }: Props) {
  const [username, onChangeUsername] = useState('')
  const [name, onChangeName] = useState('')
  const [shouldBlur, setShouldBlur] = useState(false)
  const validateUsername = async function () {
    try {
      const account = await getUserIdentity(username)
      if (account.data.identity.username === username) {
         return true
      } else {
       
        return false
      }
    } catch (error) {
      console.error('error', error)
      return false
    }
  }

  const handleRestore = async function () {
    const isValid = await validateUsername()
    if (isValid) {
      setShouldBlur(true)
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
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="Onboarding"
        />
        <TextTitle> Restore </TextTitle>

        <Text style={styles.inputTag}>USERNAME</Text>
        <SafeAreaView style={styles.inputContainer}>
          <Input
            placeholder=""
            autoFocus={true}
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
      </Backdrop>
    </Background>
  )
}

const styles = StyleSheet.create({
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
})
