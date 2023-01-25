import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Pressable } from 'react-native'
import { Text, View } from '../../components/Themed/Themed'
import { useEffect, useState } from 'react'
import { sendTransaction } from '../../utils'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import Background4 from '../../components/Background4/Background4'
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa'
import { Roboto_900Black } from '@expo-google-fonts/roboto'
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
  const account = useStoreState((state) => state.accounts[0])
  const initiatorAddress = useStoreState(
    (state) => state.accounts[0].address
  )
  const [recipientUsername, setRecipientUsername] = useState('')
  const [recipientAmount, setRecipientAmount] = useState(0)
  const [recipientAddress, setRecipientAddress] = useState('')

  useEffect(() => {
    console.log('params', route.params)
    console.log('match', route.match)
    if (route.params) {
      if (route.params.address)
        setRecipientAddress(route.params.address)
      if (route.params.username)
        setRecipientUsername(route.params.username)
      if (route.params.amount) setRecipientAmount(route.params.amount)
    }
  }, [route.params])

  const handleSend = async () => {
    console.log('====')
    console.log('==== SEND TRANSACTION')
    console.log(`Sending ${recipientAmount} to ${recipientAddress}`)
    console.log(`Initiator Address: ${initiatorAddress}`)

    await sendTransaction(
      recipientAddress,
      recipientAmount,
      account.mnemonic
    )

    return navigation.navigate('Balance')
  }

  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_900Black,
  })

  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.title}>Send JMES</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.secondTitle}>
          Send $JMES {recipientAmount}
        </Text>
        <Text style={styles.username}>
          to user {recipientUsername}
        </Text>
        <Text style={styles.address}>{recipientAddress}</Text>

        <Pressable
          onPress={async () => {
            await handleSend()
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Background4>
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
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
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
    color: '#FFF',

    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
  },
  secondTitle: {
    fontSize: 36,
    color: '#FFF',

    fontFamily: 'Comfortaa_300Light',
    paddingTop: 40,
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
