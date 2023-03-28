import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Pressable, Image } from 'react-native'
import TxHistoryList from './components/TxHistoryList'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import { useEffect, useState } from 'react'
import { Background, Navbar, Text, View } from '../../components'
import RecentTransactions from './components/RecentTransactions'
import { Navigation } from '../../types'
import * as React from 'react'

type Props = {
  navigation: Navigation
}

const transactions = [
  {
    id: '1',
    type: 'Sent',
    time: '2022-01-01 9:30 am',
    amount: '1000',
    symbol: '$',
    conversion: '1000',
  },
  {
    id: '2',
    type: 'Sent',
    time: '2022-01-01 8:00 am',
    amount: '500',
    symbol: '$',
    conversion: '500',
  },
  {
    id: '3',
    type: 'Received',
    time: '2022-01-02 6:00 am',
    amount: '2000',
    symbol: 'BTC',
    conversion: '2000',
  },
  {
    id: '4',
    type: 'Received',
    time: '2022-01-02 5:00 am',
    amount: '100',
    symbol: 'ETH',
    conversion: '500',
  },
]

export default function TransactionHistoryScreen({
  navigation,
}: Props) {
  const account = useStoreState((state) => state.accounts[0])
  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )
  const address = useStoreState((state) => state.accounts[0].address)
  const [shouldFetch, setShouldFetch] = useState(true)

  const isIOS = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const isWeb = Platform.OS === 'web'

  //   const updateStoreState = () => {
  //     console.log('UpdateStoreState')
  //     updateAccount({ ...account, balance: balance })
  //   }

  //   const getTransactions = async () => {
  //     const fetchedtransactions = await getTransactionHistory(address)
  //     setTransactions(fetchedtransactions)
  //   }

  //   useEffect(() => {
  //     console.log('account', account)
  //     getTransactions()
  //     const interval = setInterval(() => {
  //       if (shouldFetch) {
  //         getTransactions()
  //         updateStoreState()
  //       }
  //       console.log('interval')
  //     }, 10 * 1000)

  //     return () => clearInterval(interval)
  //   }, [updateStoreState])

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
          title={'Transaction History'}
          navigation={navigation}
          children={'Root'}
        />
        <TxHistoryList address={address} />
        {/* <RecentTransactions
          transactions={transactions}
          navigation={navigation}
        /> */}
        {/* Use a light status bar on iOS to account for the black space above the modal */}
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
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  transactButtonContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    flexDirection: 'row',
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#704FF7',
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
