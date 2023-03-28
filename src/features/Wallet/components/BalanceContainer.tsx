import React, { memo } from 'react'
import { View } from '../../../components'
import { Platform, StyleSheet } from 'react-native'

interface Props {
  children?: React.ReactNode
}

const BalanceContainer = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 192,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: 25,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#5136C2',
    borderRadius: 24,
  },
})

export default memo(BalanceContainer)
