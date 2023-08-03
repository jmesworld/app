import { Client } from 'jmes'
import { PUBLIC_REST_URL, PUBLIC_CHAIN_ID } from '@env'
export const getClient = () => {
  const LCDOptions = {
    URL: PUBLIC_REST_URL,
    chainID: PUBLIC_CHAIN_ID,
    isClassic: false,
  }

  const client = new Client({
    providers: {
      LCDC: LCDOptions,
    },
  })

  return client
}
