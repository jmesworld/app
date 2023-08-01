// ConvertDenom.tsx
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  cryptoValue: number
  toggleDropdown: () => void
  selectedCurrency: {
    code: string
    symbol: string
  }
  setSelectedCurrency: (currency: {
    code: string
    symbol: string
  }) => void
}

const ConvertDenom: React.FC<Props> = ({
  cryptoValue,
  toggleDropdown,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  const convertedValue = 0.3 * cryptoValue

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ≈ {convertedValue.toFixed(2)} {selectedCurrency.code}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    marginRight: 10,
    color: '#C6B4FC',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: 'none',
  },
})

export default ConvertDenom
