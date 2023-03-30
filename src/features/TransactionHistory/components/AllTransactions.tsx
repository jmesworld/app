import { memo, useEffect, useState } from 'react'
import {
  View,
  Text,
  BackdropSmall,
  TransactionList,
  BottomNav,
} from '../../../components'
import { Pressable, StyleSheet, Image } from 'react-native'

import { Navigation, Transaction } from '../../../types'

interface Props {
  children?: React.ReactNode
  navigation: Navigation
  transactions?: Transaction[]
  title?: string
  textLink?: string
}

const AllTransactions = ({
  children,
  transactions,
  navigation,
  title,
  textLink,
}: Props) => {
  return (
    <BackdropSmall>
      <TransactionList
        transactions={transactions}
        navigation={navigation}
      />
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation} />
      </View>
    </BackdropSmall>
  )
}
const styles = StyleSheet.create({
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: 'transparent',
  },
  headingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#263047',
  },
  headingSeeAll: {
    fontSize: 14,
    fontWeight: '400',
    color: '#263047',
    opacity: 0.4,
  },

  bottomNav: {
    backgroundColor: 'transparent',
  },
})

export default memo(AllTransactions)
