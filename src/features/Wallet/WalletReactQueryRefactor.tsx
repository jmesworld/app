import { useEffect } from 'react'
import { Image } from 'react-native'

import {
  Background,
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
import { useBalance } from '../../hooks/useBalance'
import { useCurrencyDropdown } from '../../hooks/useCurrencyDropdown'
import { useTransactionModal } from '../../hooks/useTransactionModal'
import { useInterval } from '../../hooks/useInterval'
import { styles } from './Wallet.styles'
type Props = {
  navigation: Navigation
}

export default function WalletScreen({ navigation }: Props) {
  const { balance, refetchBalance } = useBalance()
  const {
    showDropdown,
    toggleDropdown,
    selectedCurrency,
    handleCurrencySelection,
  } = useCurrencyDropdown()
  const {
    transactionModalVisible,
    selectedTransaction,
    setSelectedTransaction,
    setTransactionModalVisible,
  } = useTransactionModal()

  useInterval(() => {
    refetchBalance()
  }, 10 * 1000)

  return (
    <View style={styles.container}>
      <Background>
        <Image
          source={require('../../../assets/images/jmes-text.png')}
          style={styles.image}
        />
        <BalanceContainer>
          <Text style={{ marginTop: 16, fontSize: 16 }}>Balance</Text>
          <Text style={{ marginBottom: 11, fontSize: 42 }}>
            {balance !== undefined && !isNaN(balance) ? balance : '0'}
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
          itemPressed={(item) => {
            setSelectedTransaction(item)
            setTransactionModalVisible(true)
          }}
          navigation={navigation}
          title="Recent Transactions"
          textLink="See all"
        />
      </Background>
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  )
}
