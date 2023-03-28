import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native'

interface Props {
  cryptoValue: number
}

interface CurrencyRate {
  code: string
  rate: number
}

const CURRENCIES = [
  'USD $',
  'EUR €',
  'JPY ¥',
  'GBP £',
  'AUD $',
  'CAD $',
]

const ConvertDenom = ({ cryptoValue }: Props) => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>(
    []
  )
  const [selectedCurrency, setSelectedCurrency] = useState('USD $')
  const [showDropdown, setShowDropdown] = useState(false)
  const convertedValue =
    currencyRates.find((rate) => rate.code === selectedCurrency)
      ?.rate || 0

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`
        )
        const data = await response.json()
        const rates = CURRENCIES.map((code) => ({
          code,
          rate: data.rates[code],
        }))
        setCurrencyRates(rates)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCurrencyRates()
  }, [selectedCurrency])

  const handleCurrencyChange = (code: string) => {
    setSelectedCurrency(code)
    setShowDropdown(false)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ≈ {selectedCurrency}
        {(convertedValue * cryptoValue).toFixed(2)}
      </Text>
      <Pressable style={styles.button} onPress={toggleDropdown}>
        <Image
          source={require('../../../assets/icons/dropdown-arrow.svg')}
          style={{
            width: 16,
            height: 16,
          }}
        />
      </Pressable>

      {showDropdown && (
        <View style={styles.dropdown}>
          {CURRENCIES.map((currency) => (
            <Pressable
              key={currency}
              style={styles.dropdownItem}
              onPress={() => handleCurrencyChange(currency)}
            >
              <Text style={styles.text}>{currency}</Text>
            </Pressable>
          ))}
        </View>
      )}
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
  downArrow: {
    fontSize: 14,
    color: '#C6B4FC',
  },
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
})

export default ConvertDenom
