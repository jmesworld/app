import { memo, useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SectionList,
} from 'react-native'
import { useStoreState } from '../../hooks/storeHooks'
import { Transaction } from '../../types'
import { TransactionListItem } from '../Transactions/TransactionListItem'
import { fetchTransactions } from '../../api/transactionAPI'
import TransactionDetails from '../Modal/TransactionDetails'
import Modal from '../Modal/Modal'
import { useQuery } from 'react-query'
import Button from '../Button/Button'
import { categorizeTransactionByDate } from '../../lib/TransactionCategory'
import { useAppTheme } from '../../theme'
import { JMES_DENOM } from '../../utils/constants'

type Props = {
  itemPressed?: (item: Transaction) => void
  showFilter?: boolean
}

const itemsPerPage = 10
const TransactionList = ({
  showFilter = true,
  itemPressed,
}: Props) => {
  const address = useStoreState((state) => state.accounts[0]?.address)
  const [activeTab, setActiveTab] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const { colors } = useAppTheme()
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

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
    const end = showFilter ? start + itemsPerPage : 5
    switch (activeTab) {
      case 'All':
        return allTransactions?.slice(start, end)
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
    showFilter,
    itemsPerPage,
  ])
  const categorizedTransactions = useMemo(() => {
    const category = []
    const categorized = categorizeTransactionByDate(
      displayedTransactions
    )

    Object.keys(categorized).forEach((key) => {
      category.push({ title: key, data: categorized[key] })
    })
    return category
  }, [displayedTransactions, showFilter])
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  const handleItemPress = useCallback((txHash: string) => {
     const tx = allTransactions.find((tx) => tx.tx_hash === txHash)
    setSelectedTransaction(tx)
  }, [allTransactions])

  const closeModal = useCallback(() => {
    setSelectedTransaction(null)
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
  if (error && error instanceof Error)
    return (
      <Text
        style={{
          color: 'red',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Error: {error?.message}
      </Text>
    )

  return (
    <View style={styles.container}>
      {showFilter && (
        <View style={styles.tabContainer}>
          {['All', 'Sent', 'Received'].map((tab) => (
            <View
              style={{
                flex: 1,
              }}
            >
              <Button
                onPress={() => {
                  setActiveTab(tab)
                  setCurrentPage(1)
                }}
                key={tab}
                rounded="sm"
                mode={activeTab === tab ? 'contained' : 'outlined'}
              >
                <Text style={styles.tab}>{tab}</Text>
              </Button>
            </View>
          ))}
        </View>
      )}
      <SectionList
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              backgroundColor: colors.background,
              paddingVertical: 5,
            }}
          >
            <Text>{title}</Text>
          </View>
        )}
        style={styles.transactionList}
        sections={categorizedTransactions}
        keyExtractor={(item) => item.tx_hash}
        renderItem={({ item, index }) => {
          const { timestamp, tx_hash, tx_type, body } = item
          const { to_address, from_address, amount } =
            body.messages[0]

          const { denom = JMES_DENOM, amount: amt = 0 } =
            amount?.[0] || {}

          return (
            <View key={index} style={styles.listItem}>
              <Pressable onPress={() => handleItemPress(tx_hash)}>
                <TransactionListItem
                  timestamp={timestamp}
                  tx_hash={tx_hash}
                  tx_type={tx_type}
                  to_address={to_address}
                  from_address={from_address}
                  denom={denom}
                  amount={amt}
                  body={{
                    messages: [],
                  }}
                />
              </Pressable>
            </View>
          )
        }}
      />

      {showFilter && (
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
      )}
      {selectedTransaction && (
        <Modal
          height="lg"
          isVisible={true}
          onRequestClose={closeModal}
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
    width: '100%',
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
    marginBottom: 12,
    overflow: 'scroll',
    marginHorizontal: 10,
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
