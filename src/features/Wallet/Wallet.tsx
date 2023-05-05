import { useEffect, useState, useCallback } from 'react'
import { Platform, StyleSheet, Image } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'

import {
  Background,
  Text,
  View,
  CurrencyDropdown,
} from '../../components'
import {
  BalanceContainer,
  ConvertDenom,
  RecentTransactions,
  SendReceive,
} from './components'
import { getCoinBal } from '../../utils'
import { Navigation, Transaction } from '../../types'
import { CURRENCIES } from '../../constants'

type Props = {
  navigation: Navigation
}

export default function WalletScreen({ navigation }: Props) {
  const [shouldFetch, setShouldFetch] = useState(true)
  const [balance, setBalance] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCIES[0]
  )

  const isIOS = Platform.OS === 'ios'
  const isWeb = Platform.OS === 'web'

  const account = useStoreState((state) => state.accounts[0])
  const address = useStoreState((state) => state.accounts[0]?.address)

  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )

  const updateStoreState = useCallback(() => {
    updateAccount({ ...account, balance: balance })
  }, [account, balance, updateAccount])

  const getBalance = useCallback(async () => {
    const fetchedBalance = await getCoinBal(address)
    const convertBalToString = fetchedBalance.toString()
    setBalance(convertBalToString)
    console.log(convertBalToString)
  }, [address])

  useEffect(() => {
    console.log(account)
    try {
      if (account.balance === 0) {
        getBalance()
      } else {
        setBalance(account.balance)
      }
    } catch (error) {
      console.log('error', error)
    }

    const interval = setInterval(() => {
      if (shouldFetch) {
        getBalance()
        updateStoreState()
      }
    }, 10 * 1000)

    return () => clearInterval(interval)
  }, [updateStoreState, getBalance, shouldFetch])

  const toggleDropdown = useCallback(() => {
    setShowDropdown(!showDropdown)
  }, [showDropdown])

  const handleCurrencySelection = useCallback(({ code, symbol }) => {
    setSelectedCurrency({ code, symbol })
    setShowDropdown(false)
  }, [])
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
          source={require('../../../assets/images/jmes-text.png')}
          style={styles.image}
        />
        <BalanceContainer>
          <Text style={{ marginTop: 16, fontSize: 16 }}>Balance</Text>
          <Text style={{ marginBottom: 11, fontSize: 42 }}>
            {balance}
          </Text>
          <ConvertDenom
            cryptoValue={balance}
            toggleDropdown={toggleDropdown}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
          <SendReceive navigation={navigation} />
        </BalanceContainer>
        {showDropdown && (
          <CurrencyDropdown onSelect={handleCurrencySelection} />
        )}
        <RecentTransactions
          itemPressed={(item) => {
            setSelectedTransaction(item)
            setModalVisible(true)
          }}
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
  image: {
    marginTop: 7,
    width: 80,
    height: 23,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
