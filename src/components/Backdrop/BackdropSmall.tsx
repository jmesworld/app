import React, { memo } from 'react'
import { View } from '../Themed/Themed'
import { StyleSheet } from 'react-native'

interface Props {
  children?: React.ReactNode
  style?: any
}

const BackdropSmall = ({ children, style }: Props) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '95%',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: '#FCFCFD',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
})

export default memo(BackdropSmall)
