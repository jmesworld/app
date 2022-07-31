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
import {Platform, StyleSheet, Button, Pressable, Image} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import {useStoreActions, useStoreState} from "../../hooks/storeHooks";
import {useCallback, useEffect, useMemo, useState} from "react";
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
import {useDispatch} from "react-redux";

type Props = {
    navigation: Navigation;
};


export default function WalletReceiveConfirmScreen({navigation}: Props) {
    const mnemonic = useStoreState((state) => state.wallet.mnemonic);
    const address = useStoreState((state) => state.accounts[0].address)
    // const username = useStoreState((state)=>state.accounts[0].username)
    const username = useStoreState((state) => state.user.username)
    const balanceState = useStoreState((state) => state.accounts[0].balance)
    const updateAccount = useStoreActions((actions) => actions.updateAccount);


    const [balance, setBalance] = useState(balanceState);
    const [balanceEur, setBalanceEur] = useState(balanceState);

    function useUpdateStoreState(newBalance, options, deps = []) {
            // const dispatch = useDispatch();

            const updateStoreState = useCallback(async (newBalance) => {
                console.log('Called with balance of', newBalance)
                if(newBalance){
                    await updateAccount({index: 0, balance: newBalance})
                }
                // updateAccount({index: 0, balance: newBalance})
                // dispatch('UPDATE_STORE',{newBalance});
            }, [newBalance]);

            return updateStoreState;
    }
    // const updateStoreState = useUpdateStoreState();

    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });
   const updateStoreState = function() {
        console.log('UpdateStoreState');
        updateAccount({index: 0, balance: balance})
    }
    const handleRequestBalance = async () => {
        // await requestBalance();
        // console.log('RequestedVBalance',balance)
        // if(balance){
        //     try{
        //         await updateStoreState(balance);
        //     }catch (e){
        //         console.log(`Cant updateStoreState`)
        //     }
        // }
    }



    useEffect(async () => {
        try {
            async function requestBalance() {
                const fetchedBalance = await fetchAddressBalance(address);
                console.log({fetchedBalance});
                setBalance(Web3.utils.fromWei(fetchedBalance, 'ether'));
                const convertedBalance = (parseInt(fetchedBalance) * 0.1412840103).toString();
                // const convertedBalance = (parseInt(fetchedBalance) * 0.001412840103).toString();
                console.log({convertedBalance});
                setBalanceEur(parseFloat(Web3.utils.fromWei(convertedBalance, 'ether')).toFixed(2))
                console.log('Fetched.');
                // return Web3.utils.fromWei(fetchedBalance, 'ether');
                // await useUpdateStoreState(fetchedBalance, {}, [fetchedBalance])
                console.log('UPDATED BALANCE WITH', fetchedBalance);
                // updateAccount({index: 0, balance: fetchedBalance})
                // useUpdateStoreState({index: 0, balance: fetchedBalance})
                //     .then(() => {
                // })
                // })
                // .catch((e) => {
                // console.log(e);
                // navigation.navigate("WalletReceiveConfirm")
                return fetchedBalance;
            }
            const fetchedBalance = await requestBalance();
            console.log('BalanceFromEffet',fetchedBalance)
            try{
                updateAccount({index: 0, balance: fetchedBalance})
            }catch (e){
                console.log('Impossible to update account');
            }
            // if(balance){
            //     try{
            //         await updateStoreState(balance);
            //     }catch (e){
            //         console.log(`Cant updateStoreState`)
            //     }
                // await updateStoreState(balance);
                // navigation.navigate("Balance")
            // }
        }catch (e){
            console.error(e);
            // navigation.navigate("Balance")
        }

    }, [updateStoreState]);




    // useEffect(()=>{
    //     console.log('BALANCE CHANGED', balance);
        // updateAccount({index: 0, balance: balance})
    // }, [requestBalance])

    // requestBalance().then((balance)=>{
    //     console.log('BALANCE CHANGED2', balance);
    //     updateAccount({index: 0, balance: balance});
    // })
    // useEffect(() => {
    //     async function fetch() {
    //         const fetchedBalance = await fetchAddressBalance(address);
    //         console.log({fetchedBalance});
    //         setBalance(Web3.utils.fromWei(fetchedBalance, 'ether'));
    //         const convertedBalance = (parseInt(fetchedBalance) * 0.1412840103).toString();
    //         // const convertedBalance = (parseInt(fetchedBalance) * 0.001412840103).toString();
    //         console.log({convertedBalance});
    //         setBalanceEur(parseFloat(Web3.utils.fromWei(convertedBalance, 'ether')).toFixed(2))
    //         console.log('Fetched.');
    //         return Web3.utils.fromWei(fetchedBalance, 'ether');
    //     }
    //
    //     requestBalance();
    // }, []);
    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Receive JMES</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.title}>Received 10.00 </Text>

                <Pressable
                    onPress={() => handleRequestBalance()}
                    style={styles.button}
                >
                <Text style={styles.buttonText}>Ok</Text>
            </Pressable>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
        </Background4>
</View>
)
    ;
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
