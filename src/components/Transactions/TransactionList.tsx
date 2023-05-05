import { memo, useState, useMemo } from 'react'
import { View, Text } from '../Themed/Themed'
import Modal from '../Modal/Modal'
import { Pressable, StyleSheet } from 'react-native'
import { useStoreState } from '../../hooks/storeHooks'
import { Transaction } from '../../types'
import { TransactionListItem } from '../Transactions/TransactionListItem'
import { fetchTransactions } from '../../api/transactionAPI'
import TransactionDetails from '../Modal/TransactionDetails'
import { useQuery } from 'react-query'

type Props = {
  itemPressed?: (item: Transaction) => void
}

const TransactionList = ({ itemPressed }: Props) => {
  const address = useStoreState((state) => state.accounts[0]?.address)
  const [activeTab, setActiveTab] = useState('All')

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const {
    isLoading,
    error,
    data: allTransactions,
  } = useQuery(
    ['transactions', address],
    () => fetchTransactions(address),
    { enabled: !!address }
  )

  const sentTransactions =
    allTransactions?.filter(
      (transaction) => transaction.tx_type === 'Sent'
    ) || []

  const receivedTransactions =
    allTransactions?.filter(
      (transaction) => transaction.tx_type === 'Received'
    ) || []

  const displayedTransactions = useMemo(() => {
    switch (activeTab) {
      case 'All':
        return allTransactions
      case 'Sent':
        return sentTransactions
      case 'Received':
        return receivedTransactions
      default:
        return []
    }
  }, [
    activeTab,
    allTransactions,
    sentTransactions,
    receivedTransactions,
  ])
  const handleItemPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setModalVisible(true) // Set the modal visible
  }

  const closeModal = () => {
    setModalVisible(false) // 4. Add a function to close the modal
  }

  if (isLoading)
    return (
      <Text
        style={{
          color: '#704FF7',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Loading...
      </Text>
    )
  if (error)
    return (
      <Text
        style={{
          color: 'red',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Error: {error}
      </Text>
    )

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Text
          style={[
            styles.tab,
            activeTab === 'All' ? styles.activeTab : null,
          ]}
          onPress={() => setActiveTab('All')}
        >
          All
        </Text>
        <Text
          style={[
            styles.tab,
            activeTab === 'Sent' ? styles.activeTab : null,
          ]}
          onPress={() => setActiveTab('Sent')}
        >
          Sent
        </Text>
        <Text
          style={[
            styles.tab,
            activeTab === 'Received' ? styles.activeTab : null,
          ]}
          onPress={() => setActiveTab('Received')}
        >
          Received
        </Text>
      </View>
      <View style={styles.transactionList}>
        {displayedTransactions.map((tx, index) => {
          const { timestamp, tx_hash, tx_type, body } = tx
          const { to_address, from_address, amount } =
            body.messages[0]
          const { denom, amount: amt } = amount[0]

          return (
            <View key={index} style={styles.listItem}>
              <Pressable onPress={() => handleItemPress(tx)}>
                <TransactionListItem
                  timestamp={timestamp}
                  tx_hash={tx_hash}
                  tx_type={tx_type}
                  to_address={to_address}
                  from_address={from_address}
                  denom={denom}
                  amount={amt}
                />
              </Pressable>
            </View>
          )
        })}
      </View>
      {selectedTransaction && (
        <Modal
          isVisible={modalVisible}
          onRequestClose={closeModal} // Close the modal when the user presses the hardware back button on Android
        >
          <TransactionDetails
            transaction={selectedTransaction}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 40,
    marginTop: 19,
  },
  tab: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#704FF7',
    borderStyle: 'solid',
    color: '#704FF7',
    maxWidth: '25%',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 12,
  },
  activeTab: {
    flex: 1,
    maxWidth: '30%',
    backgroundColor: '#704FF7',
    color: '#FFFFFF',
  },
  transactionList: {
    marginTop: 16,
    marginBottom: 52,
    marginLeft: 35.5,
    marginRight: 21,
    backgroundColor: 'transparent',
  },
  listItem: {
    backgroundColor: 'transparent',
  },
})

export default memo(TransactionList)
