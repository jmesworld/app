import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StoreProvider } from 'easy-peasy'
import { MnemonicProvider } from './src/contexts/MnemonicContext'
import { AuthProvider } from './src/contexts/AuthProvider'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import store from './src/store'
import { Provider } from 'react-native-paper'
import { theme } from './src/theme'
import { IdentityServiceProvider } from './src/contexts/IdentityService'
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <StoreProvider store={store}>
        <MnemonicProvider>
          <IdentityServiceProvider>
            <SafeAreaProvider>
              <Provider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <AuthProvider>
                   
                    <Navigation colorScheme={colorScheme} />
                  </AuthProvider>
                  <StatusBar
                    style={colorScheme === 'dark' ? 'light' : 'dark'}
                    backgroundColor="transparent"
                    translucent={true}
                  />
                   <Toast />
                </QueryClientProvider>
              </Provider>
            </SafeAreaProvider>
          </IdentityServiceProvider>
        </MnemonicProvider>
      </StoreProvider>
    )
  }
}
