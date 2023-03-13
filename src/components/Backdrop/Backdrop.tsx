import React, { memo } from 'react'
import { View } from '../../components/Themed/Themed'
import { Platform, StyleSheet } from 'react-native'
import {
  Background4,
  Button,
  Navbar,
  TextTitle,
} from '../../components'

const Backdrop = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: 44,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: '#FCFCFD',
    borderRadius: 24,
  },
})

export default memo(Backdrop)
