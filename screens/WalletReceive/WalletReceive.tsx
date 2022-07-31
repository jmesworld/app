// import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet } from 'react-native';
//
// import { Text, View } from '../../components/Themed/Themed';
// import {useStoreActions, useStoreState} from "../../hooks/storeHooks";
// import {useEffect, useMemo, useState} from "react";
// import {fetchAddressBalance} from "../../utils";
// import Background4 from "../../components/Background4/Background4";
//
// export default function WalletScreen() {
//     const mnemonic = useStoreState((state)=>state.wallet.mnemonic);
//     const address = useStoreState((state)=>state.accounts[0].address)
//     const balanceState = useStoreState((state)=>state.accounts[0].balance)
//     const updateAccount = useStoreActions((actions) => actions.updateAccount);
//
//     function updateStoreState(){
//         updateAccount({index:0, balance: balance})
//     }
//     const [balance, setBalance] = useState(balanceState);
//
//     useEffect(() => {
//         async function fetch() {
//             const fetchedBalance = await fetchAddressBalance(address);
//             console.log({fetchedBalance});
//             setBalance(fetchedBalance);
//         }
//         fetch();
//     }, [updateStoreState]);
//     return (
//         <View style={styles.container}>
//             <Background4>
//             <Text style={styles.title}>Balance</Text>
//             <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//             <Text>Wallet</Text>
//             <Text>Mnemonic: {mnemonic}</Text>
//             <Text>Address: {address}</Text>
//             <Text>Balance: {(parseFloat(balance)/1e18)}</Text>
//
//             {/* Use a light status bar on iOS to account for the black space above the modal */}
//             <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//             </Background4>
//             </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     separator: {
//         marginVertical: 30,
//         height: 1,
//         width: '80%',
//     },
// });

import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, Button, Pressable, Image, Animated} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import {useStoreActions, useStoreState} from "../../hooks/storeHooks";
import {useEffect, useMemo, useState} from "react";
import {fetchAddressBalance} from "../../utils";
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
    Roboto_900Black
} from '@expo-google-fonts/roboto';
import Web3 from "web3";
import {Navigation} from "../../types";

type Props = {
    navigation: Navigation;
};


export default function WalletReceiveScreen({ navigation }: Props) {
    const mnemonic = useStoreState((state) => state.wallet.mnemonic);
    const address = useStoreState((state) => state.accounts[0].address)
    // const username = useStoreState((state)=>state.accounts[0].username)
    const username = useStoreState((state) => state.user.username)
    const balanceState = useStoreState((state) => state.accounts[0].balance)
    const updateAccount = useStoreActions((actions) => actions.updateAccount);


    const [balance, setBalance] = useState(balanceState);
    const [balanceEur, setBalanceEur] = useState(balanceState);

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

    async function requestBalance() {
        const fetchedBalance = await fetchAddressBalance(address);
        console.log({fetchedBalance});
        const convertedBalance = (parseInt(fetchedBalance) * 0.1412840103).toString();
        setBalanceEur(parseFloat(Web3.utils.fromWei(convertedBalance, 'ether')).toFixed(2))
        setBalance(Web3.utils.fromWei(fetchedBalance, 'ether'));
        // const convertedBalance = (parseInt(fetchedBalance) * 0.001412840103).toString();
        console.log({convertedBalance});
        console.log('Fetched.');
        return Web3.utils.fromWei(fetchedBalance, 'ether');
    }

    async function useUpdateStoreState(newBalance, options, deps = []) {
        const [response, setResponse] = useState(null);
        const [error, setError] = useState(null);
        useEffect(() => {
            const updateData = async () => {
                try {
                    console.log('useUpdateStoreState BALANCE CHANGED', balance);
                    const res = await updateAccount({index: 0, balance: newBalance});
                    const json = await res.json();
                    setResponse(json);
                } catch (error) {
                    setError(error);
                }
            };
            updateData();
        }, deps);
        return { response, error };

        // console.log('UPDATED BALANCE WITH', newBalance);
        // return updateAccount({index: 0, balance: newBalance})
    }
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });

    // useEffect(()=>{
        // requestBalance();
    // })
    // useEffect(()=>{
        // console.log('========', balance)
        // useUpdateStoreState(balance, {});
        // useUpdateStoreState(balance, {}, [balance])
    // }, [balance])


    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Receive JMES</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Pressable
                    onPress={() => handleRequestBalance() }
                    style={styles.button}>
                    <Text style={styles.buttonText}>Request from Faucet</Text>
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
