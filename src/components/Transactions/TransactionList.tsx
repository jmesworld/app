import { memo, useState, useMemo, useCallback } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useStoreState } from '../../hooks/storeHooks'
import { Transaction } from '../../types'
import { TransactionListItem } from '../Transactions/TransactionListItem'
import { fetchTransactions } from '../../api/transactionAPI'
import TransactionDetails from '../Modal/TransactionDetails'
import Modal from '../Modal/Modal'
import { useQuery } from 'react-query'
import Button from '../Button/Button'

type Props = {
  itemPressed?: (item: Transaction) => void
}

const TransactionList = ({ itemPressed }: Props) => {
  const address = useStoreState((state) => state.accounts[0]?.address)
  const [activeTab, setActiveTab] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    switch (activeTab) {
      case 'All':
        return allTransactions?.slice(start, end) || []
      case 'Sent':
        return sentTransactions.slice(start, end)
      case 'Received':
        return receivedTransactions.slice(start, end)
      default:
        return []
    }
  }, [
    activeTab,
    allTransactions,
    sentTransactions,
    receivedTransactions,
    currentPage,
    itemsPerPage,
  ])

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  const handleItemPress = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

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
        {['All', 'Sent', 'Received'].map((tab) => (
          <View
            style={{
              flex: 1,
            }}
          >
            <Button
              onPress={() => setActiveTab(tab)}
              key={tab}
              rounded="sm"
              mode={activeTab === tab ? 'contained' : 'outlined'}
            >
              <Text style={styles.tab}>{tab}</Text>
            </Button>
          </View>
        ))}
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
      <View style={styles.pagination}>
        <Text
          style={styles.paginationButton}
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </Text>
        <Text style={styles.pageNumber}>{currentPage}</Text>
        <Text
          style={styles.paginationButton}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          {'>'}
        </Text>
      </View>
      {selectedTransaction && (
        <Modal isVisible={modalVisible} onRequestClose={closeModal}>
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
    display: 'flex',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
    marginTop: 19,
    width: '100%',
  },
  tab: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 19,
  },
  activeTab: {
    // flex: 1,
    // maxWidth: '30%',
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationButton: {
    fontSize: 18,
    fontWeight: '400',
    color: '#263047',
    paddingHorizontal: 15,
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#263047',
  },
})

export default memo(TransactionList)
