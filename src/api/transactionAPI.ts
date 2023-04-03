import axios from 'axios'

interface Transaction {
  txhash: string
  timestamp: string
  from_address: string
  to_address: string
  amount: { denom: string; amount: string }[]
}

const proxyURI = 'http://localhost:8080/'

export async function fetchTransactions(address) {
  try {
    const sentResponse = await fetch(
      `${proxyURI}http://51.38.52.37:1317/cosmos/tx/v1beta1/txs?events=message.sender='${address}'`
    )
    const receivedResponse = await fetch(
      `${proxyURI}http://51.38.52.37:1317/cosmos/tx/v1beta1/txs?events=transfer.recipient='${address}'`
    )

    const sentData = await sentResponse.json()
    const receivedData = await receivedResponse.json()

    const sentTransactions = sentData.txs.map((tx, index) => ({
      ...tx,
      tx_type: 'Sent',
      timestamp: sentData.tx_responses[index].timestamp,
      tx_hash: sentData.tx_responses[index].txhash,
      status:
        sentData.tx_responses[index].code === 0
          ? 'Success'
          : 'Failed',
    }))

    const receivedTransactions = receivedData.txs.map(
      (tx, index) => ({
        ...tx,
        tx_type: 'Received',
        timestamp: receivedData.tx_responses[index].timestamp,
        tx_hash: receivedData.tx_responses[index].txhash,
        status:
          receivedData.tx_responses[index].code === 0
            ? 'Success'
            : 'Failed',
      })
    )

    const allTransactions = [
      ...sentTransactions,
      ...receivedTransactions,
    ]
    console.log('allTransactions', allTransactions)
    console.log('receivedTransactions', receivedTransactions)
    console.log('sentTransactions', sentTransactions)

    return allTransactions
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}
