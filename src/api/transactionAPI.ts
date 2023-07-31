import axios from 'axios'
import { Transaction } from '../types'
import { PUBLIC_REST_URL } from '@env'
const API_BASE_URL = `${PUBLIC_REST_URL}/cosmos/tx/v1beta1/txs`

async function fetchTransactionsByEvent(
  event: string
): Promise<any[]> {
  const response = await axios.get(`${API_BASE_URL}?events=${event}`)
  return response.data.txs.map((tx, index) => ({
    ...tx,
    tx_type: event.includes('message.sender') ? 'Sent' : 'Received',
    timestamp: response.data.tx_responses[index].timestamp,
    tx_hash: response.data.tx_responses[index].txhash,
    status:
      response.data.tx_responses[index].code === 0
        ? 'Success'
        : 'Failed',
  }))
}

export async function fetchTransactions(
  address: string
): Promise<Transaction[]> {
  try {
    const [sentTransactions, receivedTransactions] =
      await Promise.all([
        fetchTransactionsByEvent(`message.sender='${address}'`),
        fetchTransactionsByEvent(`transfer.recipient='${address}'`),
      ])

    const allTransactions = [
      ...sentTransactions,
      ...receivedTransactions,
    ]

    return allTransactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}
