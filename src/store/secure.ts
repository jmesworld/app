import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import localForage from 'localforage'
import { Platform } from 'react-native'
const isWebPlatform = () => {
  return Platform.OS === 'web'
}
const secureStore = {
  async storeDataSecurely(key, value) {
    try {
      if (isWebPlatform()) {
        await localForage.setItem(key, value)
        console.log(
          `success storing ${key}:, ${value} in localForage`
        )
      } else {
        await SecureStore.setItemAsync(key, value)
        console.log(
          `success storing ${key}:, ${value} in SecureStore`
        )
      }
    } catch (error) {
      console.error(`Error storing ${key}:`, error)
    }
  },
  async getDataSecurely(key) {
    try {
      if (isWebPlatform()) {
        const value = await localForage.getItem(key)
        console.log('value', value)
        return value
      } else {
        const value = await SecureStore.getItemAsync(key)
        return value
      }
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error)
    }
  },
  async removeDataSecurely(key) {
    try {
      if (isWebPlatform()) {
        await localForage.removeItem(key)
      } else {
        await SecureStore.deleteItemAsync(key)
      }
    } catch (error) {
      console.error(`Error removing ${key}:`, error)
    }
  },
}

export default secureStore
