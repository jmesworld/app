
import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, Pressable,TextInput, SafeAreaView} from 'react-native';
import {
    useFonts,
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';
import {
    Roboto_900Black
} from '@expo-google-fonts/roboto';
import {Text, View} from '../../components/Themed/Themed';
import {useStoreState} from "../../hooks/storeHooks";
import React from "react";
import {
    accountFromPrivateKey,
    sendTransaction,
} from "../../utils";
import Background4 from "../../components/Background4/Background4";
import {Navigation} from "../../types";

type Props = {
    navigation: Navigation;
};

export default function WalletSendScreen({navigation}: Props) {
    const privateKey = useStoreState((state) => state.wallet.privateKey)
    const [username, onChangeUsername] = React.useState('');
    const [amount, onChangeAmount] = React.useState(0);
    const [address, onChangeAddress] = React.useState('');
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });

    const handleSend = async function (_username) {
        const path = `http://localhost:3000/users?username=${_username}`;
        const requestIdentity = await fetch(path);
        const parsedRequest = await requestIdentity.json();

        if (!parsedRequest.error) {
          
            const address =  parsedRequest[0].address

            await onChangeAddress(address);

            console.log(`Preparing tx of ${amount} $JMES to User: ${username}, Address: ${address}`)

            // @ts-ignore
            const account = await accountFromPrivateKey(privateKey);
            
            await sendTransaction({amount, address}, account);
            // @ts-ignore
            return navigation.navigate({
                name: "WalletSendConfirm",
                params: {
                    username,
                    amount,
                    address
                }
            })
        } else {
            console.error(parsedRequest.error);
            return navigation.navigate( 'Balance');
        }
    }
  
    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Send JMES</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.title}>Recipient</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Enter a recipient username"
                    />
                </SafeAreaView>
                <Text style={styles.title}>Amount</Text>
                <SafeAreaView>
                    
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeAmount}
                        value={amount}
                        placeholder="Enter an amount"
                    />
                </SafeAreaView>
                <Pressable
                    onPress={async () => {
                        await handleSend(username);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Send</Text>
                </Pressable>
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
    buttonText: {
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#000000',
    },
    iconImageView: {
        flexDirection: 'row'
    },
    button: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        color: '#000000',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
    },
    input: {
        backgroundColor: "white",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    secondTitle: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40
    },
    balanceJMES: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    balanceEUR: {
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    buttonImage: {
        padding: 10
    },
    iconImage: {
        width: 30, height: 30, margin: 10
    },
    section: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "flex-start",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    noAssetText: {
        fontWeight: 'bold',
        flex: 1,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },


    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
