import { useState, useDeferredValue, Suspense } from 'react'
import { Text } from '../Themed/Themed'
import { TextInput } from 'react-native'
export const ValidateInput = () => {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const SearchResults = ({ query }: { query: string }) => {
    const isLowerCaseLettersOnly = /^[a-z]+$/.test(query)

    return (
      <>
        {query && !isLowerCaseLettersOnly ? (
          <Text color="red">
            Invalid character! Lowercase letters only please.
          </Text>
        ) : query && query.length < 3 ? (
          <Text color="orange">
            Name too short! Minimum 3 characters required.
          </Text>
        ) : data?.identity?.name.toString() === query ? (
          <Text color="red">Name taken!</Text>
        ) : query ? (
          <Text color="green">Name is available!</Text>
        ) : null}
      </>
    )
  }

  return (
    <>
      <TextInput
        disabled={status === WalletStatus.Connected ? false : true}
        width={'398px'}
        height={'49px'}
        backgroundColor="#5136C2"
        borderColor="#5136C2"
        borderRadius={12}
        alignItems="center"
        justifyContent="center"
        color="white"
        fontFamily="DM Sans"
        fontSize={'16px'}
        fontWeight="normal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => {
          identityNameQuery.refetch()
        }}
      />
      <InputRightElement marginTop={'4px'}>
        {!!identityName &&
        identityNameQuery?.data?.identity?.name.toString() !==
          identityName ? (
          <CheckIcon color={'green'} />
        ) : (
          <></>
        )}
      </InputRightElement>
    </>
  )
}
