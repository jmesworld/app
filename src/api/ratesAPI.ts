import axios from 'axios'
import { CURRENCIES } from '../constants'

interface CurrencyRate {
  code: string
  rate: number
}

export async function fetchCurrencyRates(selectedCurrency) {
  const response = await axios.get(
    `https://rates2.dashretail.org/rates?source=dashretail&symbol=dash${selectedCurrency.code}`
  )

   const parsedRate = Math.round(response.data[0].price * 100) / 100

  const rates = CURRENCIES.map(({ code, symbol }) => ({
    code,
    rate: parsedRate,
    symbol,
  }))
  return rates
}
