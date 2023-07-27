import { useEffect, useState } from 'react'
import { getUserIdentity } from '../utils'
import { useIdentityContext } from '../contexts/IdentityService'
import { GetIdentityByNameResponse } from '../client/Identityservice.types'

export const useIdentity = (
  debouncedUsername,
  disabled = false
): {
  loading: boolean
  error: null | Error
  data: null | GetIdentityByNameResponse
} => {
  const { identityService } = useIdentityContext()
  const [identity, onChangeIdentity] = useState<{
    loading: boolean
    error: Error | null
    data: GetIdentityByNameResponse | null
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
        const identity = await identityService?.getIdentityByName({
          name: debouncedUsername,
        })
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
    if (!disabled) fetchIdentity()
  }, [debouncedUsername])
  return {
    ...identity,
  }
}
