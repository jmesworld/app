// import { useEffect } from 'react'
// import { useStoreActions, useStoreState } from './storeHooks'
// import { getCoinBal } from '../utils'
// import { useQuery } from 'react-query'

// export function useBalance() {
//   const { account, address } = useStoreState((state) => ({
//     account: state.accounts[0],
//     address: state.accounts[0]?.address,
//   }))

//   const updateAccount = useStoreActions(
//     (actions) => actions.updateAccount
//   )

//   const fetchBalance = async () => {
//     if (!address) return

//     try {
//       const fetchedBalance = await getCoinBal(address)
//       return parseFloat(fetchedBalance.toString())
//     } catch (error) {
//       console.error('Error fetching balance:', error)
//       throw error
//     }
//   }

//   const { data: balance, refetch: refetchBalance } = useQuery<
//     number | undefined,
//     Error
//   >(['balance', address], fetchBalance, {
//     enabled: !!address,
//     retry: false,
//   })

//   useEffect(() => {
//     if (balance !== undefined) {
//       updateAccount({ address, balance })
//     }
//   }, [balance, address, updateAccount])

//   return { balance, refetchBalance }
// }

import { useEffect } from 'react'
import { useStoreActions, useStoreState } from './storeHooks'
import { getCoinBal } from '../utils'
import { useQuery } from 'react-query'

export function useBalance() {
  const { account, address, index } = useStoreState((state) => {
    const accountIndex = state.accounts.findIndex(
      (acc) => acc.address === state.accounts[0]?.address
    )
    return {
      account: state.accounts[0],
      address: state.accounts[0]?.address,
      index: accountIndex,
    }
  })

  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )

  const fetchBalance = async () => {
    if (!address) return

    try {
      const fetchedBalance = await getCoinBal(address)
      return parseFloat(fetchedBalance.toString())
    } catch (error) {
      console.error('Error fetching balance:', error)
      throw error
    }
  }

  const { data: balance, refetch: refetchBalance } = useQuery<
    number | undefined,
    Error
  >(['balance', address], fetchBalance, {
    enabled: !!address,
    retry: false,
  })

  useEffect(() => {
    if (balance !== undefined) {
      updateAccount({ index, address, balance })
    }
  }, [balance, address, updateAccount, index])

  return { balance, refetchBalance }
}
