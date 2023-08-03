import { Client } from 'jmes'
import { PUBLIC_RPC_URL, PUBLIC_REST_URL, PUBLIC_CHAIN_ID } from '@env'
console.log('Public', PUBLIC_REST_URL)
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
 
  // todo: make sure those are needed
  // client.query = async function (contractAddr, query) {
  //   return await client.wasm.contractQuery(contractAddr, query)
  // }
  // client.execute = async function (user, contractAddr, executeMsg) {
  //   try {
  //     const msg = new MsgExecuteContract(
  //       user.address,
  //       contractAddr,
  //       executeMsg
  //     )

  //     const txOptions = {
  //       msgs: [msg],
  //     }

  //     const key = new MnemonicKey(user.mnemonicKeyOptions)

  //     const wallet = client.wallet(key)

  //     const tx = await wallet.createAndSignTx(txOptions)

  //     return await client.tx.broadcast(tx)
  //   } catch (err) {
  //     if (err.response && err.response.data) {
  //       console.error('ERROR DATA execute:', err.response.data)
  //     } else {
  //       console.error('ERROR RAW execute:', err)
  //     }

  //     throw err
  //   }
  // }

  // client.send = async function (user, receiverAddr, coins) {
  //   try {
  //     const msg = new MsgSend(user.address, receiverAddr, coins)

  //     const txOptions = {
  //       msgs: [msg],
  //     }

  //     const key = new MnemonicKey(user.mnemonicKeyOptions)

  //     const wallet = client.wallet(key)

  //     const tx = await wallet.createAndSignTx(txOptions)

  //     return await client.tx.broadcast(tx)
  //   } catch (err) {
  //     if (err.response && err.response.data) {
  //       console.error('ERROR DATA send:', err.response.data)
  //     } else {
  //       console.error('ERROR RAW send:', err)
  //     }

  //     throw err
  //   }
  // }
  return client
}
