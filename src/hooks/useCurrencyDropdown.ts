import { useState, useCallback } from 'react'
import { CURRENCIES } from '../constants'

export function useCurrencyDropdown() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(
    CURRENCIES[0]
  )

  const toggleDropdown = useCallback(() => {
    setShowDropdown(!showDropdown)
  }, [showDropdown])

  const handleCurrencySelection = useCallback(({ code, symbol }) => {
    setSelectedCurrency({ code, symbol })
    setShowDropdown(false)
  }, [])

  return {
    showDropdown,
    toggleDropdown,
    selectedCurrency,
    handleCurrencySelection,
  }
}
