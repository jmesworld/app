import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StoreProvider } from 'easy-peasy'
import { MnemonicProvider } from './MnemonicContext'
import useCachedResources from '../hooks/useCachedResources'
import useColorScheme from '../hooks/useColorScheme'
import Navigation from '../navigation'
import store from '../store'

const queryClient = new QueryClient()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    console.log('isLoadingComplete is false')
    return null
  } else {
    return (
      <MnemonicProvider>
        <SafeAreaProvider>
          <StoreProvider store={store}>
            <QueryClientProvider client={queryClient}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar
                style={colorScheme === 'dark' ? 'light' : 'dark'}
                backgroundColor="transparent"
                translucent={true}
              />
            </QueryClientProvider>
          </StoreProvider>
        </SafeAreaProvider>
      </MnemonicProvider>
    )
  }
}
