import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { mnemonic, sendTransaction } from '../../utils'
import { getDataSecurely } from '../../store/storage'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  Text,
  StyledButton,
} from '../../components'
import { isIOS, isWeb } from '../../utils/platformDetect'
import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function WalletSendConfirmScreen({
  navigation,
  route,
}: Props) {
  const [recipientUsername, setRecipientUsername] = useState('')
  const [recipientAmount, setRecipientAmount] = useState(0)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [mnemonic, setMnemonic] = useState<any>()

  async function getMnemonic() {
    const mnemonicFromSecureStorage = await getDataSecurely(
      'mnemonic'
    )
    setMnemonic(mnemonicFromSecureStorage)

    return mnemonicFromSecureStorage
  }

  useEffect(() => {
    console.log('params', route.params)
    console.log('match', route.match)
    getMnemonic()
    if (route.params) {
      if (route.params.recipientAddress)
        setRecipientAddress(route.params.recipientAddress)
      if (route.params.username)
        setRecipientUsername(route.params.username)
      if (route.params.amount)
        setRecipientAmount(parseFloat(route.params.amount) * 1e6)
    }
  }, [route.params])

  const handleSend = async () => {
    try {
      await sendTransaction(
        recipientAddress,
        recipientAmount,
        mnemonic
      )
      return navigation.navigate('Root')
    } catch (error) {
      console.error('Error sending transaction:', error)
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
          title={'Send to'}
          navigation={navigation}
          children={'Root'}
        />
        <BackdropSmall>
          <Text style={styles.title}>Sender Account</Text>

          <Text style={styles.title}>
            Recipient Account {recipientUsername}
          </Text>
          <Text style={styles.secondTitle}>{recipientAddress}</Text>
          <Text style={styles.secondTitle}>
            Send $JMES: {recipientAmount / 1e6}
          </Text>
          <Text style={styles.secondTitle}>
            Amount in $UJMES: {recipientAmount}
          </Text>

          <View style={styles.buttonContainer}>
            <StyledButton
              style={styles.sendButton}
              onPress={async () => {
                await handleSend()
              }}
              enabled={true}
            >
              Send
            </StyledButton>
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 48,

    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',

    borderColor: '#5136C2',
    backgroundColor: '#FFFFFF',
    borderRadius: 90,
    fontColor: '#23262F',
    marginTop: 13,
    marginBottom: 13,
    fontSize: 16,
    height: 48,
    width: '48%',
  },
  sendButton: {
    flexDirection: 'row',

    backgroundColor: '#704FF7',
    borderRadius: 90,
    marginTop: 13,
    marginBottom: 13,
    fontSize: 16,
    height: 48,
    width: '48%',
  },
  title: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
    paddingLeft: 17,
  },
  secondTitle: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
    paddingLeft: 17,
  },
  username: {
    fontSize: 36,
    color: '#FFF',
    fontFamily: 'Comfortaa_300Light',
  },
  amount: {
    color: '#FFF',

    fontSize: 30,
    fontFamily: 'Comfortaa_300Light',
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
    color: '#FFF',
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  address: {
    flex: 1,
    fontSize: 12,
    color: '#FFF',
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
