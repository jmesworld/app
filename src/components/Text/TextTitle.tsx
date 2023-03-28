import React, { memo } from 'react'
import { Text, View } from '../Themed/Themed'
import { StyleSheet } from 'react-native'

const TextTitle = ({ children }) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 19,
    marginBottom: 28,
    width: '100%',
    maxWidth: 356,
    height: 20,
  },
  titleText: {
    letterSpacing: 1,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 34,
    color: '#704FF7',
    textAlign: 'center',
  },
})

export default memo(TextTitle)
