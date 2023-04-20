import { useQuery } from 'react-query'
import { fetchCurrencyRates } from '../api/ratesAPI'

export const useCurrencyRates = (selectedCurrency) => {
  return useQuery(['currencyRates', selectedCurrency], () =>
    fetchCurrencyRates(selectedCurrency)
  )
}
