import React, { memo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ReceiveItem } from './ReceiveItem'
import { SentItem } from './SentItem'
import { View, Text, BottomNav, BackdropSmall } from '../index'
import { Navigation, Transaction } from '../../types'
import { groupTransactionsByDate } from '../../utils/transactionUtils'

type Props = {
  transactions?: Transaction[]
  children?: React.ReactNode
  navigation: Navigation
  title?: string
}

const TransactionList = ({
  transactions,
  children,
  navigation,
  title,
}: Props) => {
  const [activeTab, setActiveTab] = useState('All')
  const filteredTransactions =
    activeTab === 'All'
      ? transactions
      : transactions?.filter(
          (transaction) => transaction.type === activeTab
        )

  const groupedTransactions = groupTransactionsByDate(
    filteredTransactions || []
  )

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Text
          style={[
            styles.tab,
            activeTab === 'All' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('All')}
        >
          All
        </Text>
        <Text
          style={[
            styles.tab,
            activeTab === 'Sent' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Sent')}
        >
          Sent
        </Text>
        <Text
          style={[
            styles.tab,
            activeTab === 'Received' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Received')}
        >
          Received
        </Text>
      </View>
      <View style={styles.transactionList}>
        {groupedTransactions.map((group) => (
          <View key={group.date}>
            <Text style={styles.dateHeader}>{group.date}</Text>
            {group.transactions.map((transaction) => (
              <View key={transaction.id} style={styles.listItem}>
                {transaction.type === 'Sent' ? (
                  <SentItem
                    symbol={transaction.symbol}
                    amount={transaction.amount[0].amount}
                    conversion={transaction.conversion}
                  />
                ) : (
                  <ReceiveItem
                    symbol={transaction.symbol}
                    amount={transaction.amount[0].amount}
                    conversion={transaction.conversion}
                  />
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
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
  listItem: {},
  dateHeader: {
    backgroundColor: '#F7F7F7',
    padding: 8,
    marginTop: 16,
    borderRadius: 4,
  },
  dateHeaderText: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '500',
  },
})

export default memo(TransactionList)
