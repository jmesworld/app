//import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { StoreProvider } from "easy-peasy";

import useCachedResources from "../hooks/useCachedResources";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";
import store from "../store";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StoreProvider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar translucent={true} />
        </StoreProvider>
      </SafeAreaProvider>
    );
  }
}
