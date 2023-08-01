import React from 'react'
import { StyleSheet, Pressable, SafeAreaView } from 'react-native'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  Text,
  StyledButton as NextButton,
  Input,
} from '../../components'
import { Navigation } from '../../types'
import { useStoreState } from '../../hooks/storeHooks'
import QRCode from 'react-native-qrcode-svg' // Import QRCode component
import { useClipboardTimeout } from '../../hooks/useClipboardTimeout'
import CopyIcon from '../../assets/copy.svg'
import CheckIcon from '../../assets/check.svg'
import { useAppTheme } from '../../theme'
import GeneratedQRCode from '../../components/QRCode/QRCode'

type Props = {
  navigation: Navigation
}

export default function ReceiveScreen({ navigation }: Props) {
  const address = useStoreState((state) => state.accounts[0]?.address)
  const [copied, copyToClipboard] = useClipboardTimeout()
  const { colors } = useAppTheme()

  return (
    <View style={styles.container}>
      <Background>
        <Navbar
          title={'Receive'}
          navigation={navigation}
          children={'Root'}
        />
        <BackdropSmall>
          <View style={styles.qrContainer}>
            <GeneratedQRCode
              payload={{
                address: address,
              }}
              size={168}
            />
          </View>

          <Text style={styles.textInfo}>Your JMES address</Text>
          <SafeAreaView
            style={{
              marginTop: 15,
              paddingHorizontal: 10,
              height: 60,
              width: '100%',
            }}
          >
            <Input
              containerStyle={{
                marginTop: 4,
                borderRadius: 16,
                backgroundColor: colors.bgInput,
                borderWidth: 0,
              }}
              value={`${address.substring(
                0,
                15
              )}...${address.substring(
                address.length - 15,
                address.length
              )}`}
              readonly
              placeholder={'Address or Name'}
              imgSource={
                <Pressable
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    backgroundColor: 'transparent',
                  }}
                  onPress={() => {
                    copyToClipboard(address, 2000)
                  }}
                >
                  {copied ? (
                    <CheckIcon
                      width={20}
                      height={20}
                      color={colors.green}
                    />
                  ) : (
                    <CopyIcon height={20} width={20} />
                  )}
                </Pressable>
              }
            />
          </SafeAreaView>

          <View style={styles.buttonContainer}>
            <NextButton
              onPress={() => navigation.navigate('ReceiveRequest')}
              enabled
            >
              Add Amount
            </NextButton>
          </View>
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
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 45,
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 48,

    backgroundColor: 'transparent',
  },

  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
})
