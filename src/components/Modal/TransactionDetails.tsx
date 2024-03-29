import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Navigation, Transaction } from '../../types'
import { formatDate } from '../../utils/formatDate'
import { UserAvatar } from '../userAvatar'
import { useIdentity } from '../../hooks/useIdentity'
import { useAppTheme } from '../../theme'
import JmesIcon from '../../assets/jmesBlack.svg'
import Button from '../Button/Button'
import {
  convertToUSD,
  formatBalance,
  formatUSDFromJMES,
} from '../../utils/balanceFormat'
import { useNavigation } from '@react-navigation/native'

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
  const navigation = useNavigation()
  const fromIdentity = useIdentity(fromAddress, !transaction, true)
  const toIdentity = useIdentity(toAddress, !transaction, true)
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
            <Text style={styles.statusTextConfirmed}>Confirmed</Text>
          ) : transaction.status === 'Failed' ? (
            <Text style={styles.statusTextFailed}>Failed</Text>
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
        <UserAvatar
          address={fromAddress}
          name={fromIdentity?.data?.identity?.name}
          color={colors.green}
        />

        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>To</Text>
        <UserAvatar
          color={colors.primary}
          address={toAddress}
          name={toIdentity?.data?.identity?.name}
        />
        <View style={styles.itemSeparator} />
      </View>
      <View style={styles.item}>
        <Text style={styles.textSmall}>Total Amount</Text>
        <View style={styles.amountContainer}>
          <View style={styles.amount}>
            <JmesIcon style={{
              marginRight: 5
            }} color={colors.primaryText} width={12} height={12} />
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
            {formatUSDFromJMES(amt)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            rounded="full"
            width="48%"
            onPress={() => {
              if (
               ! toAddress ||
               ! fromAddress
              ) {
                return
              }
              navigation.push('SendToAddress', {
                username: isSent
                  ? toIdentity?.data?.identity?.name
                  : fromIdentity?.data?.identity?.name,
                address: isSent ? toAddress : fromAddress,
                amount: 0,
              })
              closeModal()
            }}
          >
            <Text
              style={{
                fontWeight: 'normal',
                color: colors.black,
              }}
            >
              Send
            </Text>
          </Button>
          <Button
            rounded="full"
            mode="contained"
            width="48%"
            onPress={() => {
              // TODO: add action
              closeModal()
            }}
          >
            <Text
              style={{
                fontWeight: 'normal',
              }}
            >
              {' '}
              Close{' '}
            </Text>
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
    gap: 10,
    height: 48,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLarge: {
    fontSize: 18,
    fontWeight: '500',
    color: '#263047',
  },
  textConversion: {},
})
export default TransactionDetails
