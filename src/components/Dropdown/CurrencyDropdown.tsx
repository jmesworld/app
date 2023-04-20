// CurrencyDropdown.tsx
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { CURRENCIES } from '../../constants'

interface Props {
  onSelect: (currency: { code: string; symbol: string }) => void
}

const CurrencyDropdown: React.FC<Props> = ({ onSelect }) => {
  return (
    <View style={styles.dropdown}>
      {CURRENCIES.map((currency) => (
        <Pressable
          key={currency.code}
          style={styles.dropdownItem}
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
    top: 20,
    right: 0,
    left: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 5,
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
