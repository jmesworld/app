// ConvertDenom.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native'

import { useCurrencyRates } from '../../../hooks/useCurrencyRates'

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
  const { data: currencyRates, isLoading } =
    useCurrencyRates(selectedCurrency)

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  const selectedRate =
    currencyRates?.find((rate) => rate.code === selectedCurrency.code)
      ?.rate || 0
  const convertedValue = selectedRate * cryptoValue

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ≈ {selectedCurrency.code} {selectedCurrency.symbol}
        {convertedValue.toFixed(2)}
      </Text>
      <Pressable style={styles.button} onPress={toggleDropdown}>
        <Image
          source={require('../../../../assets/icons/arrow-down.png')}
          style={{
            width: 16,
            height: 16,
          }}
        />
      </Pressable>
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
