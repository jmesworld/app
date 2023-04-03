import { memo, useState, useEffect } from 'react'
import { View, Text, Modal } from '../../components'
import { Pressable, StyleSheet } from 'react-native'
import { useStoreState } from '../../hooks/storeHooks'
import { Navigation, Transaction } from '../../types'
import { TransactionListItem } from '../Transactions/TransactionListItem'
import { fetchTransactions } from '../../api/transactionAPI'
import TransactionDetails from '../Modal/TransactionDetails'

type Props = {
  itemPressed?: (item: Transaction) => void
}
const TransactionList = ({ itemPressed }: Props) => {
  const address = useStoreState((state) => state.accounts[0].address)
  const [activeTab, setActiveTab] = useState('All')

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const [allTransactions, setAllTransactions] = useState<
    Transaction[]
  >([])
  const [sentTransactions, setSentTransactions] = useState<
    Transaction[]
  >([])
  const [receivedTransactions, setReceivedTransactions] = useState<
    Transaction[]
  >([])

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await fetchTransactions(address)
      console.log('Transactions:', transactions)
      setAllTransactions(transactions)
      setSentTransactions(
        transactions.filter(
          (transaction) => transaction.tx_type === 'Sent'
        )
      )
      setReceivedTransactions(
        transactions.filter(
          (transaction) => transaction.tx_type === 'Received'
        )
      )
    }

    getTransactions()
  }, [address])

  const getDisplayedTransactions = () => {
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
  }

  const displayedTransactions = getDisplayedTransactions()
  const handleItemPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setModalVisible(true) // Set the modal visible
  }

  const closeModal = () => {
    setModalVisible(false) // 4. Add a function to close the modal
  }

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
          return (
            <View key={index} style={styles.listItem}>
              <Pressable
                onPress={() => handleItemPress(tx)} // Call the new handler
              >
                <TransactionListItem
                  timestamp={displayedTransactions[index].timestamp}
                  tx_hash={displayedTransactions[index].tx_hash}
                  tx_type={displayedTransactions[index].tx_type}
                  to_address={tx.body.messages[0].to_address}
                  from_address={tx.body.messages[0].from_address}
                  denom={tx.body.messages[0].amount[0].denom}
                  amount={tx.body.messages[0].amount[0].amount}
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
