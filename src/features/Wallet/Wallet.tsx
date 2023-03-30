import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Pressable, Image } from 'react-native'

import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import { useEffect, useState } from 'react'
import { Background, Text, View } from '../../components'
import BalanceContainer from './components/BalanceContainer'
import ConvertDenom from './components/ConvertDenom'
import SendReceive from './components/SendReceive'
import RecentTransactions from './components/RecentTransactions'
import { getCoinBal } from '../../utils'
import { fetchTransactions } from '../../utils/transactionUtils'
import { Navigation, Transaction } from '../../types'
import * as React from 'react'
import { faucetRequest } from '../../utils'
type Props = {
  navigation: Navigation
}

export default function WalletScreen({ navigation }: Props) {
  const [shouldFetch, setShouldFetch] = useState(true)
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const account = useStoreState((state) => state.accounts[0])
  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )
  const address = useStoreState((state) => state.accounts[0].address)

  useEffect(() => {
    fetchTransactions(address).then((res) => {
      setTransactions(res)
    })
  }, [])

  const isIOS = Platform.OS === 'ios'
  const isAndroid = Platform.OS === 'android'
  const isWeb = Platform.OS === 'web'

  const updateStoreState = () => {
    console.log('UpdateStoreState')
    updateAccount({ ...account, balance: balance })
  }

  const getBalance = async () => {
    const fetchedBalance = await getCoinBal(address)
    setBalance(fetchedBalance)
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

        <Image
          source={require('../../assets/images/JMESText.svg')}
          style={{
            marginTop: 7,
            width: 80,
            height: 23,
          }}
        />
        <BalanceContainer>
          <Text style={{ marginTop: 16, fontSize: 16 }}>Balance</Text>

          <Text style={{ marginBottom: 11, fontSize: 42 }}>
            {balance}
          </Text>
          <ConvertDenom cryptoValue={balance} />
          <SendReceive navigation={navigation} />
        </BalanceContainer>

        <RecentTransactions
          transactions={transactions}
          navigation={navigation}
          title="Recent Transactions"
          textLink="See all"
        />
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
