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

export default function HomeScreen() {
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
                <View style={{
                    height: '90%',
                    width: '100%',
                    marginTop: '10%',
                    backgroundColor: 'rgba(255,255,255,0)',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                <Text style={styles.title}>Home</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.description}>Show the user the latest notifications for them, and what's the latest news & happenings in the community</Text>
                <Text style={styles.section}>Features</Text>
                <Text style={styles.item}>
                    - Notification
                </Text>
                <Text style={styles.item}>
                    - News
                </Text>
                <Text style={styles.item}>
                    - Offers
                </Text>
                {/* Use a light status bar on iOS to account for the black space above the modal */}
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                </View>
            </Background4>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        fontFamily: 'Roboto_500Medium',
        textTransform: "uppercase",
        width: '70%',
        alignSelf: 'center'
    },
    section: {
        fontWeight: 'bold',
        color: '#FFF',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        paddingBottom: 25,
        // alignSelf: "flex-start",
        textTransform: "uppercase",
        width: '70%',
        alignSelf: 'center',
        textAlign: "center",
        fontFamily: 'Roboto_500Medium',
        textTransform: "uppercase"
    },
    item: {
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: "center"
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
