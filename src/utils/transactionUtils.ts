import axios from 'axios'

type GroupedTransaction = {
  date: string
  transactions: Transaction[]
}

interface Transaction {
  txhash: string
  timestamp: string
  from_address: string
  to_address: string
  amount: { denom: string; amount: string }[]
}

// const LCDCURL = `http://51.38.52.37:1317`
const LCDCURL = `http://164.92.191.45:1317`
export const fetchTransactions = async ({ address }) => {
  const proxyURI = 'http://localhost:8080' // pass infront of the url to avoid CORS error in web browser like so ${proxyURI}http://51.38.52.37:1317/cosmos/'

  try {
    const sentResponse = await axios.get(
      `${proxyURI}/${LCDCURL}/cosmos/tx/v1beta1/txs?events=message.sender='${address}'`
    )
    const receivedResponse = await axios.get(
      `${proxyURI}/${LCDCURL}/cosmos/tx/v1beta1/txs?events=transfer.recipient='jmes1am0unl73eqjkk230c2cvanqln62k05ezj0kkt'`
    )

    const sentData = sentResponse.data
    const receivedData = receivedResponse.data

    const sentTransactions = sentData.txs.map((tx, index) => ({
      ...tx,
      status:
        sentData.tx_responses[index].code === 0
          ? 'Success'
          : 'Failed',
    }))

    const receivedTransactions = receivedData.txs.map(
      (tx, index) => ({
        ...tx,
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

export const groupTransactionsByDate = (
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
