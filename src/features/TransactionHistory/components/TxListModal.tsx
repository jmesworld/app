import { memo, useEffect, useState } from 'react'
import {
  View,
  Text,
  TransactionList,
  BottomNav,
  BackdropSmall,
} from '../../../components'
import { Platform, Pressable, StyleSheet, Image } from 'react-native'

import { Navigation } from '../../../types'
interface Props {
  children?: React.ReactNode
  navigation: Navigation
  transactions: any
  title?: string
}

const TxListModal = ({
  children,
  transactions,
  navigation,
  title,
}: Props) => {
  useEffect(() => {
    console.log('TxListModal')
  }, [])

  return (
    <BackdropSmall>
      <View style={styles.heading}>
        <Text style={styles.headingTitle}>{title}</Text>
      </View>
      <TransactionList transactions={transactions} />
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

export default memo(TxListModal)
