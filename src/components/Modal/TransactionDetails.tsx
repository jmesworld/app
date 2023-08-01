import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Transaction } from '../../types'
import { formatDate } from '../../utils/formatDate'
import { UserAvatar } from '../userAvatar'
import { useIdentity } from '../../hooks/useIdentity'
import { useAppTheme } from '../../theme'
import JmesIcon from '../../assets/jmesBlack.svg'
import Button from '../Button/Button'
import {
  convertToUSD,
  formatBalance,
} from '../../utils/balanceFormat'

type Props = {
  transaction: Transaction | null
  closeModal: () => void
}

const TransactionDetails = ({ transaction, closeModal }: Props) => {
  const { timestamp, tx_hash, body } = transaction
  const {
    to_address: toAddress,
    from_address: fromAddress,
    amount,
  } = body.messages[0]
  if (!amount?.[0]) {
    return null
  }
  const { amount: amt } = amount[0]

  // const fromIdentity = useIdentity(fromAddress, !transaction, true)
  // const toIdentity = useIdentity(toAddress, !transaction, true)
  const { colors } = useAppTheme()
  if (!transaction) {
    return null
  }

  const isSent = transaction.tx_type === 'Sent'

  return (
    <View>
      <Text style={styles.title}>
        {isSent ? 'Sent' : 'Received'} JMES
      </Text>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Status</Text>
        <View>
          {transaction.status === 'Success' ? (
            <Text style={styles.statusTextConfirmed}>
              {transaction.status}
            </Text>
          ) : transaction.status === 'Failed' ? (
            <Text style={styles.statusTextFailed}>
              {transaction.status}
            </Text>
          ) : (
            <Text style={styles.statusTextPending}>
              {transaction.status}
            </Text>
          )}
        </View>

        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Date</Text>
        <Text style={styles.textLarge}>{formatDate(timestamp)}</Text>
        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>From</Text>
        <Text>{fromAddress}</Text>
        {/* <UserAvatar
          address={fromAddress}
          name={fromIdentity?.data?.identity?.name}
          color={colors.green}
        /> */}

        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>To</Text>
        <Text>{toAddress}</Text>
        {/* <UserAvatar
          color={colors.primary}
          address={toAddress}
          name={toIdentity?.data?.identity?.name}
        /> */}
        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Total Amount</Text>
        <View style={styles.amountContainer}>
          <View style={styles.amount}>
            <JmesIcon width={12} height={12} />
            <Text style={styles.textAmount}>
              {formatBalance(amt)}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={[
              styles.textAmount,
              {
                color: colors.darkGray,
              },
            ]}
          >
            USD {convertToUSD(amt)}
          </Text>
        </View>
        <View style={styles.itemSeparator} />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            width="full"
            onPress={() => {
              // TODO: add action
            }}
          >
            <Text>View on Main net</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  item: {
    paddingHorizontal: 24,
    width: '100%',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemSeparator: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#263047',
    opacity: 0.1,
    width: '100%',
    height: 1,
  },
  statusTextConfirmed: {
    color: '#63CC91',
    fontSize: 18,
    fontWeight: '500',
  },
  statusTextFailed: {
    color: '#FF5C5C',
    fontSize: 18,
    fontWeight: '500',
  },
  statusTextPending: {
    color: '#FFC05C',
    fontSize: 18,
    fontWeight: '500',
  },

  textSmall: {
    fontSize: 12,
    fontWeight: '400',
    color: '#454E62',
    marginBottom: 5,
  },
  textAmount: {
    fontSize: 16,
    overflow: 'hidden',
    fontWeight: '500',
    verticalAlign: 'middle',
  },
  buttonContainer: {
    width: '100%',
    height: 48,
  },
  textLarge: {
    fontSize: 18,
    fontWeight: '500',
    color: '#263047',
  },
  textConversion: {},
})
export default TransactionDetails
