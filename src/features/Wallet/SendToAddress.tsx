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
import { getUserIdentity } from '../../utils'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  StyledButton as NextButton,
  Input,
} from '../../components'
import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import ScanIcon from '../../assets/ScanBlack.svg'
import { useIdentityContext } from '../../contexts/IdentityService'
import { useIdentity } from '../../hooks/useIdentity'
import { useDebounce } from '../../hooks/useDebounce'
import { useAppTheme } from '../../theme'
import { numberSchema } from '../../validations/number'
import { useStoreState } from '../../hooks/storeHooks'
import { formatUSDFromJMES } from '../../utils/balanceFormat'

type Props = {
  navigation: Navigation
  route: Route<any>
}

export default function SendToAddress({ navigation, route }: Props) {
  const { colors } = useAppTheme()
  const account = useStoreState((state) => state.accounts)
  const [address, setAddress] = useState('')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState({
    value: '',
    error: null,
  })

  useEffect(() => {
    if (
      !route.params?.address &&
      !route.params?.amount &&
      !route.params?.name
    ) {
      return
    }
    if (route.params?.amount) {
      setAmount({ value: route.params?.amount, error: null })
    }
    if (route.params?.address) {
      setAddress(route.params?.address)
    }
    if (route.params?.name) {
      setName(route.params?.name)
    }
  }, [])

  const debouncedname = useDebounce({
    value: name,
    delay: 500,
  })

  const identity = useIdentity(debouncedname, !name, name.length > 20)

  const handleTxParams = async (username: string) => {
    // @ts-ignore
    return navigation.navigate({
      name: 'WalletSendConfirm',
      params: {
        username,
        amount: amount.value,
        recipientAddress: address,
      },
    })
  }

  const canProceed = useMemo(() => {
    if (!amount || amount.value === '' || amount.error) {
      return false
    }
    
   

    return true
  }, [identity, amount, name])

  const searchResult = useMemo(() => {
    return address
  }, [identity, debouncedname])

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
      return 'Not found'
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
                readonly
                value={address}
                placeholder={'Address or Name'}
                placeholderTextColor="rgba(112, 79, 247, 0.5)"
              />
            </SafeAreaView>

            {/* <Text
              selectionColor={colors.primary}
              style={[
                styles.searchResult,
                {
                  color:
                    searchResult === 'notFound'
                      ? colors.red
                      : colors.darkGray,
                },
              ]}
              selectable
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {name && getSearchResultMessage}
            </Text> */}

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
              onPress={() => handleTxParams(name)}
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
    backgroundColor: 'transparent'
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
    backgroundColor: '#f1edfe',
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
