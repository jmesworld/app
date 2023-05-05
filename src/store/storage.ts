import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import localForage from 'localforage'
import { Platform } from 'react-native'

interface Storage {
  getItem(key: string): Promise<any>
  setItem(key: string, data: any): Promise<void>
  removeItem(key: string): Promise<void>
  encryptToken(token: string): Promise<void>
  decryptToken(): Promise<string | null>
  encrypt(key: string, data: string): Promise<void>
  decrypt(key: string): Promise<string | null>
}

const storage: Storage = {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key)
    return JSON.parse(item || '')
  },
  setItem: async (key, data) => {
    await AsyncStorage.setItem(key, JSON.stringify(data))
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key)
  },
  encryptToken: async (token) => {
    await storage.encrypt('secure_token', JSON.stringify(token))
  },
  decryptToken: async () => {
    return storage.decrypt('secure_token')
  },
  encrypt: async (key, data) => {
    await SecureStore.setItemAsync(key, data)
  },
  decrypt: async (key) => {
    return SecureStore.getItemAsync(key)
  },
}

const isWebPlatform = (): boolean => {
  return Platform.OS === 'web'
}

// Store data securely
export async function storeDataSecurely(
  key: string,
  value: string
): Promise<void> {
  try {
    const storageMethod = isWebPlatform()
      ? localForage.setItem
      : SecureStore.setItemAsync
    await storageMethod(key, value)
  } catch (error) {
    console.error(`Error storing ${key}:`, error)
  }
}

// Retrieve data securely
export async function getDataSecurely(
  key: string
): Promise<string | null> {
  try {
    const storageMethod = isWebPlatform()
      ? localForage.getItem
      : SecureStore.getItemAsync
    const value = await storageMethod(key)
    return value as string | null
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error)
  }
}

// Remove data securely
export async function removeDataSecurely(key: string): Promise<void> {
  try {
    const storageMethod = isWebPlatform()
      ? localForage.removeItem
      : SecureStore.deleteItemAsync
    await storageMethod(key)
  } catch (error) {
    console.error(`Error removing ${key}:`, error)
  }
}

export default storage
