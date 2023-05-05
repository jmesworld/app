import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native'

import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'

import GeneratedQRCode from '../../components/QRCode/QRCode'
import {
  Background4,
  BackdropSmall,
  Navbar,
  View,
  Text,
  StyledButton as NextButton,
  Background,
} from '../../components'

import { Navigation } from '../../types'
import { IQRCodePayload } from '../../store'
import { SCHEMA_PREFIX, notateWeiValue } from '../../utils'

type Props = {
  navigation: Navigation
}

const isIOS = Platform.OS === 'ios'
const isWeb = Platform.OS === 'web'

export default function RequestScreen({ navigation }: Props) {
  const address = useStoreState((state) => state.accounts[0]?.address)
  const username = useStoreState((state) => state.user.username)
  const [payload, setPayload] = useState<IQRCodePayload>()
  const [data, setData] = useState('')
  const [isValidInput, setIsValidInput] = useState(true)

  const parsePayload = async () => {
    // Currently resembles a request amount transaction
    const parsedAmount = parseFloat(data)

    // Check if parsedAmount is a valid number before converting to wei
    if (!isNaN(parsedAmount)) {
      const notatedAmount = await notateWeiValue(parsedAmount)
      const url = `${SCHEMA_PREFIX}${address}?value=${notatedAmount}`
      const payloadData = {
        url: url,
        address: address,
        username: username,
        amount: notatedAmount,
      }

      setPayload(payloadData)
    } else {
      setPayload(undefined)
    }
  }

  const handleGenerateQR = async () => {
    //implement case switch to determine type of transaction being made (request,transfer, etc)
    if (data) {
      await parsePayload()
    } else {
      alert('Please enter a valid Amount')
    }
  }
  const handleTextInputChange = async (value: string) => {
    setData(value)

    // Check if input contains only numbers and a single decimal point
    const isNumber = /^-?\d*(\.\d+)?$/.test(value)

    if (isNumber) {
      setIsValidInput(true)
      if (value) {
        await parsePayload()
      } else {
        setPayload(undefined)
      }
    } else {
      setIsValidInput(false)
    }
  }

  return (
    <View style={styles.container}>
      <Background>
        <View
          style={
            isWeb
              ? { height: 44, backgroundColor: 'transparent' }
              : { height: 'auto', backgroundColor: 'transparent' }
          }
        >
          <StatusBar style={isIOS ? 'light' : 'auto'} />
        </View>
        <Navbar
          title={'Request'}
          navigation={navigation}
          children={'WalletReceive'}
        />
        <BackdropSmall>
          <Text style={styles.title}>Amount</Text>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              placeholder="JMES"
              onChangeText={handleTextInputChange}
              keyboardType="numeric"
              value={data}
            />
            {!isValidInput && (
              <Text style={{ color: 'red', textAlign: 'center' }}>
                Only numbers are allowed
              </Text>
            )}
            <Text style={styles.conversionText}>
              {payload ? `≈ ${payload.amount}` : null}
            </Text>
            {payload ? <GeneratedQRCode payload={payload} /> : null}
          </SafeAreaView>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.cancelButton}
              onPress={async () => {
                navigation.navigate('Root')
              }}
            >
              <Text
                style={{
                  color: '#23262F',
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={styles.sendButton}
              onPress={async () => {
                navigation.navigate('Root')
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              >
                Done
              </Text>
            </Pressable>
          </View>
        </BackdropSmall>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
  sendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#704FF7',
    borderRadius: 90,
    fontSize: 16,
    height: 48,
    width: '48%',
  },
  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 90,
    border: '1px solid #5136C2',
    fontSize: 16,
    height: 48,
    width: '48%',
  },

  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

    marginTop: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 48,
    backgroundColor: 'transparent',
  },

  iconImageView: {
    flexDirection: 'row',
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
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
  },
  input: {
    placeholderTextColor: 'rgba(112, 79, 247, 0.5)',
    fontSize: 38,
    textAlign: 'center',
    color: '#704FF7',
    paddingLeft: 19,
    marginLeft: 14,
    marginRight: 14,

    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 24,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    width: '90%',
    height: 60,
  },
  conversionText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
    color: '#454E62',
    opacity: 0.6,
    fontSize: 16,
    fontWeight: '400',
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
    paddingTop: 40,
  },
  balanceJMES: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  balanceEUR: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  buttonImage: {
    padding: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: 10,
  },
  section: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  noAssetText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
