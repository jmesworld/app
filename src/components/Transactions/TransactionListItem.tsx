import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Transaction } from '../../types'
import { formatDateToTime } from '../../utils/formatDate'
import SendIcon from '../../assets/Send.svg'
import ReceiveIcon from '../../assets/Download.svg'
import JmesIcon from '../../assets/jmesBlack.svg'
import { useIdentity } from '../../hooks/useIdentity'
import { useAppTheme } from '../../theme'

export const TransactionListItem = (transaction: Transaction) => {
  const shortenAddress = (address) => {
    if (!address || address.length < 7) return address
    return address.slice(0, 4) + '...' + address.slice(-3)
  }

  const { colors } = useAppTheme()

  const identity = useIdentity(
    transaction.tx_type === 'Sent'
      ? transaction.from_address
      : transaction.to_address,
    false,
    true
  )
  const isSent = transaction.tx_type === 'Sent'
  return (
    <View style={styles.transactionListItem}>
      <Pressable
        style={{
          backgroundColor: isSent ? colors.bgInput : colors.greenBg,
          borderRadius: 18,
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {transaction.tx_type === 'Sent' ? (
          <SendIcon />
        ) : (
          <ReceiveIcon />
        )}
      </Pressable>
      <View style={styles.transactionType}>
        <Text style={styles.topText}>
          {identity.data?.identity?.name}
          {!identity?.data?.identity?.name &&
            !identity.loading &&
            'Unknown'}

          {!identity.error &&
            identity.loading &&
            !identity.data &&
            'Loading...'}
        </Text>
        <Text style={styles.bottomText}>
          {transaction.tx_type === 'Sent' ? 'Sent' : 'Received'} -{' '}
          {formatDateToTime(transaction.timestamp)}
        </Text>
      </View>
      <View style={styles.transactionValue}>
        <View style={styles.flexRow}>
          <Text style={styles.topText} numberOfLines={1}>
            {transaction.tx_type === 'Sent' ? '-' : '+'}
          </Text>
          <JmesIcon height={12} width={12} />
          <Text style={styles.topText} numberOfLines={1}>
            {(Number(transaction.amount) / 1e6).toFixed(2)}
          </Text>
        </View>
        <Text style={styles.bottomText}>
          {transaction.tx_type === 'Sent'
            ? shortenAddress(transaction.to_address)
            : shortenAddress(transaction.from_address)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  transactionListItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    width: '100%',
    height: 60,
    color: 'white',
    backgroundColor: 'transparent',
  },
  transactionType: {
    flexDirection: 'column',
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  transactionValue: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  topText: {
    fontSize: 16,
    color: '#263047',
    fontWeight: '500',
    preWrap: 'true',
  },
  bottomText: {
    marginTop: 5,
    fontSize: 12,
    color: '#454E62',
    fontWeight: '400',
  },
})
