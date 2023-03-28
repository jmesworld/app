// src/TxHistory.tsx
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import axios from 'axios'

interface Transaction {
  txhash: string
  timestamp: string
  tx: {
    value: {
      msg: {
        value: {
          from_address: string
          to_address: string
          amount: { denom: string; amount: string }[]
        }
      }[]
    }
  }
}

interface TxHistoryProps {
  address: string
}

const TxHistoryList: React.FC<TxHistoryProps> = ({ address }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [sentResponse, receivedResponse] = await Promise.all([
          axios.get(
            `https://lcd.example.com/txs?message.action=send&message.sender=${address}&limit=100`
          ),
          axios.get(
            `https://lcd.example.com/txs?message.action=send&message.recipient=${address}&limit=100`
          ),
        ])

        const sentTxs = sentResponse.data.txs
        const receivedTxs = receivedResponse.data.txs
        const mergedTxs = [...sentTxs, ...receivedTxs]

        // Sort transactions by timestamp
        mergedTxs.sort(
          (a: Transaction, b: Transaction) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
        )

        setTransactions(mergedTxs)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTransactions()
  }, [address])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>TxHash</Text>
        <Text style={styles.headerCell}>From</Text>
        <Text style={styles.headerCell}>To</Text>
        <Text style={styles.headerCell}>Amount</Text>
        <Text style={styles.headerCell}>Timestamp</Text>
      </View>
      {transactions.map((tx) => {
        const { txhash, timestamp } = tx
        const { from_address, to_address, amount } =
          tx.tx.value.msg[0].value
        return (
          <View key={txhash} style={styles.row}>
            <Text style={styles.cell}>{txhash}</Text>
            <Text style={styles.cell}>{from_address}</Text>
            <Text style={styles.cell}>{to_address}</Text>
            <Text style={styles.cell}>
              {amount
                .map((token) => `${token.amount} ${token.denom}`)
                .join(', ')}
            </Text>
            <Text style={styles.cell}>
              {new Date(timestamp).toLocaleString()}
            </Text>
          </View>
        )
      })}
    </ScrollView>
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
    marginTop: 10,
    marginBottom: 10,
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

export default TxHistoryList
