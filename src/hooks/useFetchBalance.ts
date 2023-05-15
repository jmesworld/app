import { useState, useEffect } from 'react'
import { getCoinBal } from '../utils'

type FetchBalance = (address: string, shouldFetch: boolean) => number

export const useFetchBalance: FetchBalance = (
  address,
  shouldFetch
) => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const fetchedBalance = await getCoinBal(address)
        setBalance({ fetchedBalance })
      } catch (error) {
        console.error('Error fetching balance:', error)
      }
    }

    if (shouldFetch) {
      fetchBalance()
      const interval = setInterval(fetchBalance, 10 * 1000)
      return () => clearInterval(interval)
    }
  }, [address, shouldFetch])

  return balance
}
