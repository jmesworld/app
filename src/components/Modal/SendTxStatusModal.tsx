import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native'
import StyledButton from '../Button/StyledButton'

type Props = {
  transactionStatus: string | null
  closeModal: () => void
}

const SendTxStatusModal = ({
  transactionStatus,
  closeModal,
}: Props) => {
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
            Transaction {transactionStatus}!
          </Text>
        </View>
      ) : transactionStatus === 'Failed' ? (
        <Text style={styles.statusTextFailed}>
          Transaction {transactionStatus}
        </Text>
      ) : (
        <Text style={styles.statusTextPending}>
          Transaction {transactionStatus}
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
    marginBottom: 20,
  },
  statusTextConfirmed: {
    color: '#63CC91',
    fontSize: 18,
    fontWeight: '500',
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
    color: '#FFC05C',
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
