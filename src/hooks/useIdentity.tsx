import { useEffect, useState } from 'react'
import { getUserIdentity } from '../utils'

export const useIdentity = (debouncedUsername) => {
  const [identity, onChangeIdentity] = useState<{
    loading
    error
    data
  }>({
    loading: false,
    error: null,
    data: null,
  })

  useEffect(() => {
    if (!debouncedUsername) {
      return
    }
    async function fetchIdentity() {
      onChangeIdentity((p) => ({
        ...p,
        loading: true,
      }))
      try {
        const identity = await getUserIdentity(debouncedUsername)
        onChangeIdentity({
          loading: false,
          error: null,
          data: identity,
        })
      } catch (error) {
        onChangeIdentity({
          loading: false,
          error,
          data: null,
        })
      }
    }
    fetchIdentity()
  }, [debouncedUsername])

  return {
    ...identity,
  }
}
