import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { fetchTransactions } from '../../api/transactionAPI'

interface Transaction {
  tx_response: { txhash: string; timestamp: string }
  tx: {
    auth_info: any
    body: any
    signatures: string[]
    status: string
  }
}

interface TransactionHistoryProps {
  address: string
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  address,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions(address)
      setTransactions(data)
    }
    getTransactions()
  }, [address])

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>From</Text>
        <Text style={styles.headerCell}>To</Text>
        <Text style={styles.headerCell}>Amount</Text>
      </View>

      {transactions.map((tx, index) => {
        const txs = tx.body.messages[0]
        const to_address = txs.to_address
        const from_address = txs.from_address
        const amount = txs.amount[0].amount
        const denom = txs.amount[0].denom
        console.log(txs)
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}> FROM: {from_address}</Text>
            <Text style={styles.cell}>--------</Text>
            <Text style={styles.cell}>TO: {to_address}</Text>
            <Text style={styles.cell}>{amount}</Text>
            <Text style={styles.cell}>{denom}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
  cell: {
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
})

export default TransactionHistory
