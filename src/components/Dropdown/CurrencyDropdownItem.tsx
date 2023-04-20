import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const CurrencyDropdownItem = ({ currency, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onSelect(currency)}
    >
      <Text>{currency.code}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})

export default CurrencyDropdownItem
