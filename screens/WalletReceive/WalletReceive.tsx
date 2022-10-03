import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet,  Pressable, TextInput, SafeAreaView} from 'react-native';
import {Text, View} from '../../components/Themed/Themed';
import {useStoreState, useStoreActions} from "../../hooks/storeHooks";
import Background4 from "../../components/Background4/Background4";
import GeneratedQRCode from '../../components/QRCode/QRCode';

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

import {Navigation} from "../../types";
import {IQRCodePayload } from "../../lib/IQRCodePayload"
import { SCHEMA_PREFIX, notateWeiValue } from '../../utils';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

type Props = {
    navigation: Navigation;
};

    // QRCODE URI Syntax: schema_prefix target_address [ "@" chain_id ] [ "/" function_name ] [ "?" parameters ]
    // example of transfer jmes:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359/transfer?address=0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359=1
    // example of request jmes:0xfb6916095ca1df60bb79Ce92ce3ea74c37c5d359?value=2.014e18 

    
export default function WalletReceiveScreen({ navigation }: Props) {
 
    const address = useStoreState((state) => state.accounts[0].address)
    const username = useStoreState((state) => state.user.username)
    //const [payload, setPayload] = useState<IQRCodePayload>()
    const [payload, setPayload] = useState(null)
    const [amount, setAmount] = useState(0);

    const parsePayload = async () => { //currently resembles a request amount transaction
        const notatedAmount = await notateWeiValue(amount)
        const parsedPayload = `${SCHEMA_PREFIX}${address}?value=${notatedAmount}`
        
        setPayload(parsedPayload)
        console.log("payload", parsedPayload)
    }
    
    const handleGenerateQR = async () => {
        if (amount) {
        //implement case switch to determine type of transaction being made (request,transfer, etc)
            await parsePayload()
        }
        else{
            alert("Please enter a valid Amount");
          }
    }

    const handleRequestBalance = async () => {
        return await requestReceiveFromFaucet();
    }

    const requestReceiveFromFaucet = async function() {
        const path = `http://3.72.109.56:3001/faucet/receive/${username}`;
        console.log(path);
        const requestFaucet = await fetch(path);
        console.log(await requestFaucet.json());
        return navigation.navigate("Balance");
    }


    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });


    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Receive JMES</Text>
                <Pressable
                    onPress={() => handleRequestBalance() }
                    style={styles.button}>
                    <Text style={styles.buttonText}>Request from Faucet</Text>
                </Pressable>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
               
                <SafeAreaView>
                    <TextInput style={styles.input} placeholder="Enter an amount" onChangeText={(val) => setAmount(val)}/>
                    {payload ? 
                        <GeneratedQRCode payload={payload}/> 
                    : null
                    }
                </SafeAreaView>
                <Pressable
                    onPress={async() => { 
                        await handleGenerateQR() 
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Generate QR Code</Text>
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
    buttonText:{
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#000000',
    },
    iconImageView:{
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
    secondTitle:{
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40
    },
    balanceJMES:{
        fontWeight: 'bold',
        flex: 0,
        fontSize: 24,
        lineHeight: 28,
        paddingTop: 15,
        alignSelf: "center",
        fontFamily: 'Roboto_900Black',
        textTransform: "uppercase"
    },
    balanceEUR:{
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
