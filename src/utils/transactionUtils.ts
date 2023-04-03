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

export const fetchTransactions = async ({ address }) => {
  const proxyURI = 'http://localhost:8080/'
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
      status:
        sentData.tx_responses[index].code === 0
          ? 'Success'
          : 'Failed',
    }))

    // const receivedTransactions = receivedData.tx_responses.logs.events.map(
    //   (events, index) => ({
    //     ...events,
    //     type: receivedData.tx_responses[index].logs.events.type === 'transfer' ? 'transfer' : 'other',
    //     recipient:
    //     amount: receivedData.tx_responses[index].logs.events[0].attributes[1].value,

    //   })
    // )
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
