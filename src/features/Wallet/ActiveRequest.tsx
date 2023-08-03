import { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

import { useStoreState } from '../../hooks/storeHooks'
import GeneratedQRCode from '../../components/QRCode/QRCode'
import {
  BackdropSmall,
  Navbar,
  View,
  Text,
  Background,
  Button,
} from '../../components'
import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import { useAppTheme } from '../../theme'
import { useQuery } from 'react-query'
import { getUserReceivedTransactions } from '../../api/transactionAPI'
import { TransactionReceived } from '../../components/Modal/TransactionReceived'
import Modal from '../../components/Modal/Modal'
import { formatUSDFromJMES } from '../../utils/balanceFormat'

type routeParams = {
  amount: string
}
type Props = {
  navigation: Navigation
  route: Route<'ActiveRequest', routeParams>
}

const ActiveRequest = ({ navigation, route }: Props) => {
  const timestamp = useRef(Date.now())
  const { colors } = useAppTheme()
  const amount = route.params.amount
  const address = useStoreState((state) => state.accounts[0]?.address)

  const [transaction, setTransaction] = useState<any>(null)

  const { data } = useQuery({
    queryKey: ['getBalance', address],
    queryFn: async ({ queryKey }) => {
      return getUserReceivedTransactions(queryKey[1])
    },
    refetchInterval: 1000,
    cacheTime: 0,
    staleTime: 0,
  })

  useEffect(() => {
    if (!data) {
      return
    }
    const recentTransaction = data.filter((tr) => {
      const datum = Date.parse(tr.timestamp)
      const TRAmount = tr?.body?.messages?.[0]?.amount?.[0]?.amount
      if (!amount) {
        return false
      }
      if (Number(TRAmount) / 1e6 !== Number(amount)) {
        return false
      }
      return datum > timestamp.current
    })
    if (recentTransaction.length > 0) {
      setTransaction(recentTransaction[0])
    }
  }, [data])

  const sentFromAddress = useMemo(() => {
    if (!transaction) {
      return
    }
    return transaction?.body?.messages?.[0]?.from_address
  }, [transaction])

  const onDone = () => {
    navigation.navigate('Root')
  }

  return (
    <View style={styles.container}>
      {transaction && (
        <Modal isVisible={!!transaction} onRequestClose={onDone}>
          <TransactionReceived
            onDone={onDone}
            address={sentFromAddress}
            amount={amount}
          />
        </Modal>
      )}
      <Background>
        <Navbar
          title={'Request Amount'}
          navigation={navigation}
          children={'ReceiveRequest'}
        />
        <BackdropSmall>
          <View style={styles.mainContent}>
            <Text style={styles.title}>Requesting</Text>
            <Text
              style={[
                styles.amount,
                {
                  color: colors.primary,
                },
              ]}
            >
              {amount}
            </Text>
            <Text style={styles.conversionText}>
              {amount && formatUSDFromJMES(amount, false)}
            </Text>
            <View style={styles.qrContainer}>
              <GeneratedQRCode
                size={200}
                payload={{
                  address: address,
                  amount: amount,
                }}
              />
            </View>
          </View>

          {!transaction && (
            <ActivityIndicator size="large" color={colors.primary} />
          )}
          <View style={styles.buttonContainer}>
            <Button rounded="full" mode="outlined" onPress={async () => {
              navigation.navigate('Root')
            }}>
              <Text
                style={{
                  fontWeight: '500',
                  textTransform: 'none',
                  fontStyle: 'normal',
                  fontSize: 16,
                  color: colors.black
                }}
              >
                Cancel
              </Text>
            </Button>
          </View>
        </BackdropSmall>
      </Background>
    </View>
  )
}
export default ActiveRequest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainContent: {
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  qrContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    height: 200,
    marginTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

    marginTop: 'auto',
    marginBottom: 40,
    width: '90%',
    height: 48,
    backgroundColor: 'transparent',
  },

  amount: {
    marginTop: 15,
    fontSize: 38,
    textAlign: 'center',
  },
  conversionText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
    color: '#454E62',
    opacity: 0.6,
    fontSize: 16,
    fontWeight: '400',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
  },
})
