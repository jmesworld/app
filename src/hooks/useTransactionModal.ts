import { useState } from 'react'
import { Transaction } from '../types'

export function useTransactionModal() {
  const [transactionModalVisible, setTransactionModalVisible] =
    useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

  return {
    transactionModalVisible,
    selectedTransaction,
    setSelectedTransaction,
    setTransactionModalVisible,
  }
}
