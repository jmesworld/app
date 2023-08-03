import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native'
import StyledButton from '../Button/StyledButton'
import { useAppTheme } from '../../theme'

type Props = {
  transactionStatus: string | null
}

const SendTxStatusModal = ({ transactionStatus }: Props) => {
  const { colors } = useAppTheme()
  if (!transactionStatus) {
    return null
  }

  return (
    <View style={styles.statusContainer}>
      {transactionStatus === 'Success' ? (
        <View>
          <Image
            style={{
              width: 51.67,
              height: 51.67,
              alignSelf: 'center',
            }}
            source={require('../../../assets/icons/tx-complete.png')}
          />
          <Text style={styles.statusTextComplete}>
            Transaction Successful!
          </Text>
          <Text style={[styles.desc, {color: colors.darkGray}]}>See details in history.</Text>
        </View>
      ) : transactionStatus === 'Failed' ? (
        <Text style={styles.statusTextFailed}>
          Transaction Failed
        </Text>
      ) : (
        <Text style={styles.statusTextPending}>
          Transaction {transactionStatus}!
        </Text>
      )}
      {transactionStatus === 'Pending' && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    marginTop: 82,
  },
  statusTextComplete: {
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 29,
    marginBottom: 10,
  },
  statusTextConfirmed: {
    color: '#63CC91',
    fontSize: 18,
    fontWeight: '500',
  },
  desc: {
    fontSize: 16,
    alignSelf: 'center',
  },
  statusTextFailed: {
    color: '#FF5C5C',
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 29,
    marginBottom: 20,
  },
  statusTextPending: {
    color: '#ffa500',
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 20,
  },

  textSmall: {
    fontSize: 12,
    fontWeight: '400',
    color: '#454E62',
  },
  textLarge: {
    fontSize: 18,
    fontWeight: '500',
    color: '#263047',
  },
  textConversion: {},
})
export default SendTxStatusModal
