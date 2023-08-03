import { useEffect, useMemo, useState } from 'react'
import { useIdentityContext } from '../contexts/IdentityService'
import { GetIdentityByNameResponse } from '../client/Identityservice.types'
import { useQuery } from 'react-query'

export const useIdentity = (
  debouncedUsername,
  disabled = false,
  isAddress = false
): {
  loading: boolean
  error: null | Error
  data: null | GetIdentityByNameResponse
} => {
  const { identityService, identityCache, setIdentityCache } =
    useIdentityContext()
  const identityFromCache = useMemo(() => {
    if (!identityCache) return null
    if (isAddress) {
      return identityCache[debouncedUsername]
    }
    return Object.values(identityCache).find(
      (identity) => identity?.identity?.name === debouncedUsername
    )
  }, [identityCache, debouncedUsername, isAddress])
  const { isFetching, data, error } = useQuery({
    queryKey: ['fetchIdentity', debouncedUsername, isAddress],
    queryFn: async () => {
      if (isAddress) {
        return identityService.getIdentityByOwner({
          owner: debouncedUsername,
        })
      }
      return identityService.getIdentityByName({
        name: debouncedUsername,
      })
    },
    onError: (err) => {
      console.error(err)
    },
    onSuccess: (data) => {
      if (data?.identity?.owner) {
        setIdentityCache((cache) => ({
          ...cache,
          [data.identity.owner]: data,
        }))
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    staleTime: 0,
    enabled: !identityFromCache && !disabled,
  })

  return {
    data: identityFromCache || data,
    loading: identityFromCache ? false : isFetching,
    error: identityFromCache ? null : (error as Error),
  }
}
