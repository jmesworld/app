import React from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native'
import { Transaction } from '../../types'

type Props = {
  symbol?: React.ReactNode
  amount?: any
  conversion?: string
}

export const SentItem = ({ symbol, amount, conversion }: Props) => {
  const time = new Date()
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })
    .toLowerCase()
  return (
    <View style={styles.transactionListItem}>
      <Pressable>
        <Image
          source={require('../../assets/icons/Send-midnight.svg')}
          style={{
            width: 15,
            height: 15,
            alignSelf: 'center',
          }}
        />
      </Pressable>
      <View style={styles.transactionType}>
        <Text style={styles.topText}>Sent</Text>
        <Text style={styles.bottomText}>{time}</Text>
      </View>
      <View style={styles.transactionValue}>
        <Text style={styles.topText}>{amount} JMES</Text>
        <Text style={styles.bottomText}>
          {symbol}
          {conversion}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  transactionListItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
  },
  transactionType: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 37,
  },
  transactionValue: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  topText: {
    fontSize: 16,
    color: '#263047',
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 12,
    color: '#454E62',
    fontWeight: '400',

    alignSelf: 'flex-end',
  },
})
