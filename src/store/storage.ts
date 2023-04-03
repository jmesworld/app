import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import localForage from 'localforage'
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
  async encrypt(key: any, data: any) {
    SecureStore.setItemAsync(key, data)
  },
  async decrypt(key: any) {
    SecureStore.getItemAsync(key)
  },
}

const isWebPlatform = () => {
  return typeof window !== 'undefined' && window.navigator
}

// Store data securely
export async function storeDataSecurely(key, value) {
  try {
    if (isWebPlatform()) {
      await localForage.setItem(key, value)
    } else {
      await SecureStore.setItemAsync(key, value)
    }
  } catch (error) {
    console.error(`Error storing ${key}:`, error)
  }
}

// Retrieve data securely
export async function getDataSecurely(key) {
  try {
    if (isWebPlatform()) {
      const value = await localForage.getItem(key)
      return value
    } else {
      const value = await SecureStore.getItemAsync(key)
      return value
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error)
  }
}
export default storage
