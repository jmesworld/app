import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, Button, Pressable} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import Background4 from "../../components/Background4/Background4";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import {
  Roboto_500Medium,
  Roboto_900Black
} from '@expo-google-fonts/roboto';

export default function MarketplaceScreen() {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_500Medium,
    Roboto_900Black
  });

  return (
      <View style={styles.container}>
        <Background4>
          <Text style={styles.title}>Events</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
          <Text style={styles.description}>
            Enables the user to discover local/global events they might want to attend, events they're booked for via ticket or membership.
          </Text>
          <Text style={styles.section}>Features</Text>
          <Text style={styles.item}>
            - Interactive Calendar
          </Text>
          <Text style={styles.item}>
            - Local / Global search
          </Text>
          <Text style={styles.item}>
            - Show tickets / entitlements
          </Text>
          <Text style={styles.item}>
            - Buy Tickets
          </Text>
          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </Background4>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
  },
  description: {
    fontWeight: 'bold',
    flex: 0,
    color: '#FFF',
    fontSize: 16,
    lineHeight: 18,
    paddingTop: 15,
    // alignSelf: "flex-start",
    fontFamily: 'Roboto_500Black',
    textTransform: "uppercase",
    width: '70%',
    alignSelf: 'center'
  },
  section: {
    fontWeight: 'bold',
    flex: 0,
    color: '#FFF',
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    paddingBottom: 25,
    // alignSelf: "flex-start",
    textTransform: "uppercase",
    width: '70%',
    alignSelf: 'center',
    textAlign: "center",
    fontFamily: 'Roboto_500Black',
    textTransform: "uppercase"
  },
  item: {
    fontWeight: 'bold',
    color: '#FFF',
    paddingTop: 5,
    alignSelf: "center"
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
