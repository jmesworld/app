import React, { memo, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ReceiveItem } from './ReceiveItem'
import { SentItem } from './SentItem'

type Transaction = {
  id: string
  type: string
  time: string
  amount: string
  symbol: string
  conversion: string
}

type GroupedTransaction = {
  date: string
  transactions: Transaction[]
}

type Props = {
  transactions?: Transaction[]
}

const groupTransactionsByDate = (
  transactions: Transaction[]
): GroupedTransaction[] => {
  const groupedTransactions: GroupedTransaction[] = []
  transactions.forEach((transaction) => {
    const transactionDate = new Date(
      transaction.time
    ).toLocaleDateString('en-US')
    const existingGroup = groupedTransactions.find(
      (group) => group.date === transactionDate
    )

    if (existingGroup) {
      existingGroup.transactions.push(transaction)
    } else {
      groupedTransactions.push({
        date: transactionDate,
        transactions: [transaction],
      })
    }
  })

  return groupedTransactions
}

const TransactionList = ({ transactions }: Props) => {
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
            <Text style={styles.date}>{group.date}</Text>
            {group.transactions.map((transaction) => (
              <View key={transaction.id} style={styles.listItem}>
                {transaction.type === 'Sent' ? (
                  <SentItem
                    symbol={transaction.symbol}
                    value={transaction.amount}
                    conversion={transaction.conversion}
                  />
                ) : (
                  <ReceiveItem
                    symbol={transaction.symbol}
                    value={transaction.amount}
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
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 40,
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
