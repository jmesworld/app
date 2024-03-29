import { useEffect, useMemo, useState } from 'react'

import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  Image,
  Text,
} from 'react-native'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  StyledButton as NextButton,
  Input,
} from '../../components'

import ScanIcon from '../../assets/ScanBlack.svg'
import CloseIcon from '../../assets/close.svg'
import { useIdentity } from '../../hooks/useIdentity'
import { useDebounce } from '../../hooks/useDebounce'
import { useAppTheme } from '../../theme'
import { numberSchema } from '../../validations/number'
import { useStoreState } from '../../hooks/storeHooks'
import { formatUSDFromJMES } from '../../utils/balanceFormat'
import { RootNavigateProps, RootRouteProps } from '../../navigation'

type Props = {
  navigation: RootNavigateProps<'Send'>
  route: RootRouteProps<'Send'>
}

export default function SendScreen({ navigation, route }: Props) {
  const { colors } = useAppTheme()
  const account = useStoreState((state) => state.accounts)
  const [nameOrAddress, setNameOrAddress] = useState('')
  const [amount, setAmount] = useState({
    value: '',
    error: null,
  })

  useEffect(() => {
    if (!route.params?.address && !route.params?.amount) {
      return
    }
    if (route.params?.amount) {
      setAmount({ value: route.params?.amount, error: null })
    }
    if (route.params?.address) {
      setNameOrAddress(route.params?.address)
    }
  }, [])

  const debouncedNameOrAddress = useDebounce({
    value: nameOrAddress,
    delay: 500,
  })

  const identity = useIdentity(
    debouncedNameOrAddress,
    !nameOrAddress,
    nameOrAddress.length > 20
  )

  const handleTxParams = async (username: string) => {
    // @ts-ignore
    return navigation.push('SendConfirm', {
      username: username.length < 20 ? username : 'unknown',
      amount: amount.value,
      recipientAddress: identity.data?.identity?.owner
        ? identity.data?.identity?.owner
        : nameOrAddress,
    })
  }

  const canProceed = useMemo(() => {
    if (!amount || amount.value === '' || amount.error) {
      return false
    }
    if (nameOrAddress === '') {
      return false
    }
    if (identity.loading || identity.error) {
      return false
    }

    if (!identity.data && nameOrAddress.length < 20) {
      return false
    }

    return true
  }, [identity, amount, nameOrAddress])

  const searchResult = useMemo(():
    | 'loading'
    | 'notFound'
    | string => {
    if (identity.loading) {
      return 'loading' as const
    }
    if (debouncedNameOrAddress !== nameOrAddress) {
      return 'loading' as const
    }
    if (identity.error) {
      return identity.error.message
    }
    if (!identity.data) {
      return 'notFound'
    }
    const name = identity.data?.identity?.name
    const address = identity.data?.identity?.owner
    if (address === account?.[0].address) {
      return 'you are sending to yourself.'
    }
    if (!address) {
      return 'notFound'
    }
    if (!name && debouncedNameOrAddress === address) {
      return address
    }
    if (debouncedNameOrAddress === address) {
      return address
    }
    if (debouncedNameOrAddress === name) {
      return address
    }
    if (debouncedNameOrAddress !== name) {
      return 'loading'
    }
    return ''
  }, [identity, debouncedNameOrAddress])

  useEffect(() => {
    if (
      !identity.data?.identity?.owner ||
      debouncedNameOrAddress.length <= 20
    ) {
      return
    }
    const addr = identity.data?.identity?.owner
    const name = identity.data?.identity?.name
    if (addr !== debouncedNameOrAddress) {
      return
    }
    if (!name) {
      return
    }
    setNameOrAddress(name)
  }, [identity])

  const onAmountChange = (value: string) => {
    if (!numberSchema.safeParse(value).success && value !== '') {
      return
    }
    const balance = account[0]?.balance
    if (!balance) {
      return
    }
    const balanceNumber = Number(balance || 0)

    setAmount({
      value,
      error:
        balanceNumber < Number(value) ? 'Insufficient balance' : null,
    })
  }

  const getSearchResultMessage = useMemo(() => {
    if (searchResult === 'loading') {
      return 'Loading...'
    }
    if (searchResult === 'notFound') {
      return 'Identity not found'
    }
    return searchResult
  }, [searchResult])

  return (
    <View style={styles.container}>
      <Background>
        <Navbar
          title={'Send to'}
          navigation={navigation}
          children={'Root'}
        />
        <BackdropSmall>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Recipient</Text>
            <SafeAreaView
              style={{
                height: 60,
                width: '100%',
              }}
            >
              <Input
                containerStyle={{
                  borderRadius: 24,
                  borderColor: 'rgba(112, 79, 247, 0.5)',
                  backgroundColor: '#f1edfe',
                }}
                style={{
                  borderColor: 'rgba(112, 79, 247, 0.5)',
                  backgroundColor: '#f1edfe',
                }}
                onChangeText={setNameOrAddress}
                value={nameOrAddress}
                placeholder={'Address or Name'}
                placeholderTextColor="rgba(112, 79, 247, 0.5)"
                imgSource={
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                    onPress={() => {
                      if (nameOrAddress) {
                        setNameOrAddress('')
                        return
                      }
                      navigation.push('Scan')
                    }}
                  >
                    {nameOrAddress.length ? (
                      <CloseIcon
                        height={30}
                        width={30}
                        fill={colors.primary}
                      />
                    ) : (
                      <ScanIcon height={33} width={33} />
                    )}
                  </Pressable>
                }
              />
            </SafeAreaView>

            <Text
              selectionColor={colors.primary}
              style={[
                styles.searchResult,
                {
                  color:
                    searchResult === 'notFound'
                      ? colors.orange
                      : colors.darkGray,
                },
              ]}
              selectable
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {nameOrAddress && getSearchResultMessage}
            </Text>

            <Text
              style={[
                styles.title,
                {
                  marginTop: 10,
                },
              ]}
            >
              Amount
            </Text>
            <SafeAreaView>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={onAmountChange}
                value={amount.value}
                placeholder={'Amount to send'}
                placeholderTextColor="rgba(112, 79, 247, 0.5)"
              />
            </SafeAreaView>
            {amount.error && (
              <Text
                selectionColor={colors.primary}
                style={[
                  styles.searchResult,
                  {
                    color: colors.red,
                  },
                ]}
                selectable
                ellipsizeMode="middle"
                numberOfLines={1}
              >
                {amount.error}
              </Text>
            )}
            {amount.value && (
              <Text
                selectionColor={colors.primary}
                style={[
                  styles.searchResult,
                  {
                    color: colors.darkGray,
                  },
                ]}
                selectable
                ellipsizeMode="middle"
                numberOfLines={1}
              >
                {formatUSDFromJMES(amount.value, false)}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <NextButton
              onPress={() => handleTxParams(nameOrAddress)}
              enabled={canProceed}
            >
              Next
            </NextButton>
          </View>
        </BackdropSmall>
      </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
    width: '90%',
    height: 48,

    backgroundColor: 'transparent',
  },
  searchResult: {
    marginTop: 10,
    marginBottom: 5,
    height: 20,
    marginLeft: 10,
  },
  iconImageView: {
    flexDirection: 'row',
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },

  title: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 24,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    width: '100%',
    paddingLeft: 20,
    height: 60,
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
    paddingTop: 40,
  },
  balanceJMES: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  balanceEUR: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  buttonImage: {
    padding: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: 10,
  },
  section: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  noAssetText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
