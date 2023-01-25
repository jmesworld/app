import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

// async storage should not be used for sensitive data and instead using a secure library like expo-secure-store
const storage = {
  async getItem(key: any) {
    return JSON.parse(await AsyncStorage.getItem(key))
  },
  async setItem(key: any, data: any) {
    AsyncStorage.setItem(key, JSON.stringify(data))
  },
  async removeItem(key: any) {
    AsyncStorage.removeItem(key)
  },
  async encryptToken(token: string) {
    SecureStore.setItemAsync('secure_token', JSON.stringify(token))
  },
  async decryptToken() {
    SecureStore.getItemAsync('secure_token')
  },
  // async setEncryptedItem (key: any, data: any) {
  //   SecureStore.setItemAsync(key, data);
  // },
  //  async getEncryptedItem(key: any) {
  //   SecureStore.getItemAsync(key);
  // },
}

export default storage
