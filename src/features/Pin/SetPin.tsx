import { Route } from '@react-navigation/native'
import React, { memo, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  Backdrop,
  Background4,
  Navbar,
  StyledButton,
  TextInfo,
  TextTitle,
  PinInput,
} from '../../components'
import { navigateToScreen, validatePin } from '../../utils'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
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
    <Background4>
      <Backdrop>
        <Navbar navigation={navigation} children="Confirm" />
        <TextTitle> Choose a 4 digit pin </TextTitle>
        <TextInfo>
          For quick access to you wallet and security, please set a
          pin.
        </TextInfo>
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
      </Backdrop>
    </Background4>
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
})
