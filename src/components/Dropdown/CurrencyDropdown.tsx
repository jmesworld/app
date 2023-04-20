// CurrencyDropdown.tsx
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { CURRENCIES } from '../../constants'

interface Props {
  onSelect: (currency: { code: string; symbol: string }) => void
}

const CurrencyDropdown = ({ onSelect }: Props) => {
  return (
    <View style={styles.dropdown}>
      {CURRENCIES.map((currency) => (
        <Pressable
          key={currency.code}
          style={styles.item}
          onPress={() => onSelect(currency)}
        >
          <Text style={styles.text}>
            {currency.symbol} {currency.code}{' '}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    zIndex: 1000, // Make sure the dropdown is rendered above other components
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    marginRight: 10,
    color: '#C6B4FC',
    letterSpacing: 0.5,
  },
})

export default CurrencyDropdown
