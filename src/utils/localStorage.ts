import { useStoreActions } from '../hooks/storeHooks'
import { secureStorage } from '../library/storage'

export const storeInLocal = async (
  identity: any,
  navigation: any
) => {
  if (identity.account.signature.isVerified && identity.username) {
    await useStoreActions((actions) => actions.addUser)({
      username: identity.username,
      signature: identity.account.signature,
    })
    await useStoreActions((actions) => actions.addWallet)({
      mnemonic: mnemonic,
      privateKey: identity.account.privateKey,
    })
    await useStoreActions((actions) => actions.addAccount)({
      index: 0,
      title: 'default',
      address: identity.account.address,
    })
    await useStoreActions((actions) => actions.addToken)({
      token: await getToken(identity.account.response), // getToken returns tokenReq.data
    })
    await secureStorage.encryptToken(
      await getToken(identity.account.response)
    )
    setTimeout(() => {
      navigation.navigate('Root')
    }, 5000)
  } else {
    console.log('Invalid credentials, signature unverified')
  }
  return identity
}
