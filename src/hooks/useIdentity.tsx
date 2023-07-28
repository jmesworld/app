import { useEffect, useState } from 'react'
import { getUserIdentity } from '../utils'
import { useIdentityContext } from '../contexts/IdentityService'
import { GetIdentityByNameResponse } from '../client/Identityservice.types'

export const useIdentity = (
  debouncedUsername,
  disabled = false,
  isAddress = false
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
        error: null,
        data: null,
        loading: true,
      }))
      try {
        let identity = null
        if (isAddress) {
          identity = await identityService.getIdentityByOwner({
            owner: debouncedUsername,
          })
          onChangeIdentity({
            loading: false,
            error: null,
            data: identity,
          })
          return
        }
        identity = await identityService?.getIdentityByName({
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
