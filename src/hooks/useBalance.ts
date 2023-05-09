import { useStoreActions, useStoreState } from './storeHooks'
import { getCoinBal } from '../utils'
import { useQuery } from 'react-query'

export function useBalance() {
  const { account, address } = useStoreState((state) => ({
    account: state.accounts[0],
    address: state.accounts[0]?.address,
  }))
  const updateAccount = useStoreActions(
    (actions) => actions.updateAccount
  )

  const fetchBalance = async () => {
    try {
      const fetchedBalance = await getCoinBal(address)
      return parseFloat(fetchedBalance.toString())
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  const { data: balance, refetch: refetchBalance } = useQuery<
    number | undefined,
    Error
  >(['balance', address], fetchBalance, {
    enabled: !!address,
    retry: false,
    onSuccess: (data) => {
      if (data !== undefined) {
        updateAccount({ ...account, balance: data })
      }
    },
  })

  return { balance, refetchBalance }
}
