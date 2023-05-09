import { Route } from '@react-navigation/native'
import React, { memo, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import {
  Backdrop,
  Background,
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  PinInput,
  BackdropSmall,
} from '../../components'
import { navigateToScreen, validatePin } from '../../utils'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
type Props = {
  navigation: Navigation
  route: Route<any>
}

const SetPinScreen = ({ navigation, route }: Props) => {
  const [pinNumbers, setPinNumbers] = useState<string[]>([
    '',
    '',
    '',
    '',
  ])
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [mnemonic, setMnemonic] = useState('')
  const [isPinComplete, setIsPinComplete] = useState(false)
  useEffect(() => {
    if (route.params) {
      setName(route.params.name)
      setUsername(route.params.username)
      setMnemonic(route.params.recoveryPhrase)
    }
  }, [route.params])
  useEffect(() => {
    setIsPinComplete(pinNumbers.every((value) => value !== ''))
  }, [pinNumbers])

  const validateInputPin = async () => {
    if (pinNumbers.length === 4) {
      return true
    } else {
      alert('Pin invalid')
    }
    return false
  }

  const handleNav = async () => {
    const isValid = await validateInputPin()
    if (isValid) {
      // @ts-ignore
      navigateToScreen(navigation, 'ConfirmPin', {
        pinNumbers,
        username,
        name,
        recoveryPhrase: mnemonic,
      })
    } else {
      alert('Invalid pin')
    }
  }

  return (
    <View style={styles.container}>
      <Background>
        <BackdropSmall>
          <OnboardingNavbar
            navigation={navigation}
            children="Confirm"
          />
          <View style={styles.centeredContainer}>
            <TextTitle> Choose a 4 digit pin </TextTitle>
            <TextInfo>
              For quick access to you wallet and security, please set
              a pin.
            </TextInfo>
          </View>
          <PinInput
            pinNumbers={pinNumbers}
            setPinNumbers={setPinNumbers}
          />

          <SafeAreaView style={styles.buttonContainer}>
            <StyledButton
              enabled={isPinComplete}
              disabled={!isPinComplete}
              onPress={async () => {
                await handleNav()
              }}
            >
              <Text>Next</Text>
            </StyledButton>
          </SafeAreaView>
        </BackdropSmall>
      </Background>
    </View>
  )
}

export default memo(SetPinScreen)
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '93%',
    height: 49,
    marginTop: 42,
    marginBottom: 14,
  },
})
