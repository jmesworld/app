import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import {
  Text,
  View,
  CurrencyDropdown,
  BottomNav,
} from '../../components'
import {
  BalanceContainer,
  ConvertDenom,
  RecentTransactions,
  SendReceive,
} from './components'
import { Navigation } from '../../types'
import { useCurrencyDropdown } from '../../hooks/useCurrencyDropdown'
import { useTransactionModal } from '../../hooks/useTransactionModal'
import { styles } from './Wallet.styles'
import {
  useStoreActions,
  useStoreState,
} from '../../hooks/storeHooks'
import { getCoinBal } from '../../utils'
import BackgroundWithNoScrollView from '../../components/Background/BackgroundWithNoScrollView'

type Props = {
  navigation: Navigation
}

export default function WalletScreen({ navigation }: Props) {
  const [shouldFetch, setShouldFetch] = useState(true)
  const [balance, setBalance] = useState(0)

  const account = useStoreState((state) => state.accounts[0])
  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )
  const address = useStoreState((state) => state.accounts[0].address)
  const {
    showDropdown,
    toggleDropdown,
    selectedCurrency,
    handleCurrencySelection,
  } = useCurrencyDropdown()

  const { setSelectedTransaction, setTransactionModalVisible } =
    useTransactionModal()

  const updateStoreState = () => {
    updateAccount({ ...account, balance: balance })
  }

  const getBalance = async () => {
    const fetchedBalance = await getCoinBal(address)
    setBalance(fetchedBalance)
  }
  useEffect(() => {
    getBalance()

    const interval = setInterval(() => {
      if (shouldFetch) {
        getBalance()
        updateStoreState()
      }
    }, 10 * 1000)

    return () => clearInterval(interval)
  }, [updateStoreState])

  return (
    <View style={styles.container}>
      <BackgroundWithNoScrollView>
        <Image
          source={require('../../../assets/images/jmes-text.png')}
          style={styles.image}
        />
        <BalanceContainer>
          <Text
            style={{ color: 'white', marginTop: 16, fontSize: 16 }}
          >
            Balance
          </Text>
          <Text
            style={{ color: 'white', marginBottom: 11, fontSize: 42 }}
          >
            {balance}
          </Text>

          <ConvertDenom
            setSelectedCurrency={handleCurrencySelection}
            cryptoValue={balance}
            toggleDropdown={toggleDropdown}
            selectedCurrency={selectedCurrency}
          />
          <SendReceive navigation={navigation} />
        </BalanceContainer>
        {showDropdown && (
          <CurrencyDropdown onSelect={handleCurrencySelection} />
        )}

        <RecentTransactions
          showFilter={false}
          itemPressed={(item) => {
            setSelectedTransaction(item)
            setTransactionModalVisible(true)
          }}
          navigation={navigation}
          title="Recent Transactions"
          textLink="See all"
          viewStyle={{
            paddingBottom: 66,
          }}
        />
        <View style={styles.bottomSpacer} />
      </BackgroundWithNoScrollView>
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  )
}
