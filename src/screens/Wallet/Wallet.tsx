import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Pressable, Image } from 'react-native'

import { Text, View } from '../../components/Themed/Themed'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import { useEffect, useState } from 'react'

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
import { getCoinBal, convertToEur } from '../../utils'
import { Navigation } from '../../types'
import * as React from 'react'

type Props = {
  navigation: Navigation
}

export default function WalletScreen({ navigation }: Props) {
  const account = useStoreState((state) => state.accounts[0])
  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )
  const address = useStoreState((state) => state.accounts[0].address)
  const [shouldFetch, setShouldFetch] = useState(true)
  const [balance, setBalance] = useState(0)
  const [balanceEur, setBalanceEur] = useState('')

  const updateStoreState = () => {
    console.log('UpdateStoreState')
    updateAccount({ ...account, balance: balance })
  }

  const getBalance = async () => {
    const fetchedBalance = await getCoinBal(address)
    setBalance(fetchedBalance)

    const convertedBalance = await convertToEur(fetchedBalance)
    const parseConvertedBalance = await parseFloat(
      convertedBalance
    ).toFixed(2)
    setBalanceEur(parseConvertedBalance)
  }

  useEffect(() => {
    console.log('account', account)
    getBalance()
    const interval = setInterval(() => {
      if (shouldFetch) {
        getBalance()
        updateStoreState()
      }
      console.log('interval')
    }, 10 * 1000)

    return () => clearInterval(interval)
  }, [updateStoreState])

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
        <Text style={styles.title}>Balance</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <Text style={styles.balanceJMES}>JMES {balance}</Text>
        <Text style={styles.balanceEUR}>(EUR {balanceEur})</Text>

        <View style={styles.iconImageView}>
          <Pressable
            onPress={() => navigation.navigate('WalletReceive')}
            style={styles.buttonImage}
          >
            <Image
              source={require('../../assets/icons/receive-white.png')}
              style={styles.iconImage}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('WalletSend')}
            style={styles.buttonImage}
          >
            <Image
              source={require('../../assets/icons/send_white.png')}
              style={styles.iconImage}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Scan')}
            style={styles.buttonImage}
          >
            <Image
              source={require('../../assets/icons/scan_white.png')}
              style={styles.iconImage}
            />
          </Pressable>
        </View>

        <Text style={styles.secondTitle}>Asset</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.noAssetText}>No assets yet :)</Text>

        <Pressable
          onPress={() => navigation.navigate('CreateAsset')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Mint</Text>
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
    backgroundColor: '#ffffff1f',
    marginTop: 5,
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
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    fontFamily: 'Comfortaa_300Light',
  },
  secondTitle: {
    fontSize: 36,
    color: '#FFF',
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
    color: '#FFF',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  balanceEUR: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    color: '#FFF',
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  buttonImage: {
    padding: 10,
    margin: 5,
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
    color: '#FFF',
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  noAssetText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    color: '#FFF',
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
