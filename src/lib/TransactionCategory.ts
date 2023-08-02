import { Transaction } from '../types'

export const categorizeTransactionByDate = (
  transactions: Transaction[]
) => {
  const categorizedTransactions: Record<string, Transaction[]> = {}
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const todayString = today.toDateString()
  const yesterdayString = yesterday.toDateString()
  transactions?.forEach((transaction) => {
    let date = new Date(transaction.timestamp).toDateString()
    if (date === todayString) {
      date = 'Today'
    }
    if (date === yesterdayString) {
      date = 'Yesterday'
    }
    if (!categorizedTransactions[date]) {
      categorizedTransactions[date] = [transaction]
      return
    }
    categorizedTransactions[date].push(transaction)
  })

  return categorizedTransactions
}
