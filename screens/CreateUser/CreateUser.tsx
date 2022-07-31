// import React, { memo, useEffect, useState } from "react";
// import {
//     Background2 as Background,
//     BackButton,
//     Header,
//     NumberKeyboard, Button, Paragraph,
// } from "../../components";
// import { useStoreActions } from "../../hooks/storeHooks";
// import { Navigation } from "../../types";
//
// import {generateMnemonic, mnemonicToSeed, accountFromSeed, deriveSeed, signMessage} from "../../utils";
// import {TextInput, Text, StyleSheet} from "react-native";
// import {SafeAreaView} from "react-native";
// import {white} from "react-native-paper/lib/typescript/styles/colors";
//
// type Props = {
//     navigation: Navigation;
// };
//
// const CreateUserScreen = ({ navigation }: Props) => {
//     const [username, onChangeUsername] = React.useState('');
//     const [mnemonic, onChangeMnemonic] = React.useState(null);
//
//     const addWallet = useStoreActions((actions) => actions.addWallet);
//     const addUser = useStoreActions((actions) => actions.addUser);
//     const addAccount = useStoreActions((actions) => actions.addAccount);
//     const addPasscode = useStoreActions((actions) => actions.addPasscode);
//
//     useEffect(() => {
//         async function generate() {
//             const mnemonic = await generateMnemonic();
//             onChangeMnemonic(mnemonic)
//         }
//         generate();
//     }, []);
//
//     async function register(){
//         console.log('SEND TO BACKEND');
//         console.log(mnemonic, username);
//         const seed = await mnemonicToSeed(mnemonic);
//         const derivation = await deriveSeed(seed, 0, 0)
//         const {signature} = await signMessage('jmesworld', derivation.privateKey);
//         console.log({derivation});
//         console.log(signature)
//         addUser({
//             username,
//             signature: signature
//         });
//
//         addWallet({
//             mnemonic: mnemonic,
//             seed: seed,
//         });
//
//         addAccount({index:0, title: 'default', address: derivation.address});
//         navigation.navigate("SetPin")
//         addPasscode("");
//     }
//     return (
//         <Background noMenu skipHeader>
//             <BackButton goBack={() => navigation.navigate("Onboarding")} />
//             <Header>Create new account</Header>
//             <SafeAreaView>
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={onChangeUsername}
//                     value={username}
//                     placeholder="Enter a username"
//                 />
//             </SafeAreaView>
//             <Paragraph bold>The mnemonic is your unique generated safe password. Please, store it appropriately.</Paragraph>
//             <Paragraph bold>Mnemonic: {mnemonic}</Paragraph>
//             <Paragraph bold>No one will be able to retrieve, reset or change it for you.</Paragraph>
//             <Button mode="contained" onPress={() => register()}>
//                 Register
//             </Button>
//         </Background>
//     );
// };
//
// const styles = StyleSheet.create({
//     text:{
//         color: "white"
//     },
//     input: {
//         backgroundColor: "white",
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
// });
// export default memo(CreateUserScreen);
// import React, { memo, useEffect, useState } from "react";
// import {
//     Background2 as Background,
//     BackButton,
//     Header,
//     NumberKeyboard, Button, Paragraph,
// } from "../../components";
// import { useStoreActions } from "../../hooks/storeHooks";
// import { Navigation } from "../../types";
//
// import {generateMnemonic, mnemonicToSeed, accountFromSeed, deriveSeed, signMessage} from "../../utils";
// import {TextInput, Text, StyleSheet} from "react-native";
// import {SafeAreaView} from "react-native";
// import {white} from "react-native-paper/lib/typescript/styles/colors";
//
// type Props = {
//     navigation: Navigation;
// };
//
// const LogUserScreen = ({ navigation }: Props) => {
//     const [username, onChangeUsername] = React.useState('');
//     const [mnemonic, onChangeMnemonic] = React.useState('');
//
//     const addWallet = useStoreActions((actions) => actions.addWallet);
//     const addUser = useStoreActions((actions) => actions.addUser);
//     const addAccount = useStoreActions((actions) => actions.addAccount);
//
//     async function login(){
//         console.log('SEND TO BACKEND FOR VERIFICATION');
//         console.log(mnemonic, username);
//         const seed = await mnemonicToSeed(mnemonic);
//         const derivation = await deriveSeed(seed, 0, 0)
//         const {signature} = await signMessage('jmesworld', derivation.privateKey);
//         console.log({derivation});
//         console.log(signature)
//
//         addUser({
//             username,
//             signature: signature
//         });
//
//         addWallet({
//             mnemonic: mnemonic,
//             seed: seed,
//         });
//
//         addAccount({index:0, title: 'default', address: derivation.address, username});
//         navigation.navigate("SetPin")
//     }
//     return (
//         <Background noMenu skipHeader>
//             <BackButton goBack={() => navigation.navigate("Onboarding")} />
//             <Header>Log in account</Header>
//             <SafeAreaView>
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={onChangeUsername}
//                     value={username}
//                     placeholder="Enter your username"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={onChangeMnemonic}
//                     value={mnemonic}
//                     placeholder="Enter your mnemonic"
//                 />
//             </SafeAreaView>
//             <Button mode="contained" onPress={() => login()}>
//                 Login
//             </Button>
//         </Background>
//     );
// };
//
// const styles = StyleSheet.create({
//     text:{
//         color: "white"
//     },
//     input: {
//         backgroundColor: "white",
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10,
//     },
// });
// export default memo(LogUserScreen);
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
import {Platform, StyleSheet, Button, Pressable, Image, TextInput, SafeAreaView, Animated} from 'react-native';

import {Text, View} from '../../components/Themed/Themed';
import {useStoreActions, useStoreState} from "../../hooks/storeHooks";
import React, {useEffect, useMemo, useState} from "react";
import {
    accountFromSeed,
    deriveSeed,
    fetchAddressBalance,
    generateMnemonic,
    mnemonicToSeed,
    signMessage
} from "../../utils";
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

export default function LogUserScreen({navigation}: Props) {
    const [username, onChangeUsername] = React.useState('');
    const [mnemonic, onChangeMnemonic] = React.useState('');
    const [address, onChangeAddress] = React.useState('');
    let [fontsLoaded] = useFonts({
        Comfortaa_300Light,
        Comfortaa_400Regular,
        Comfortaa_500Medium,
        Comfortaa_600SemiBold,
        Comfortaa_700Bold,
        Roboto_900Black
    });

    const addWallet = useStoreActions((actions) => actions.addWallet);
    const addUser = useStoreActions((actions) => actions.addUser);
    const addAccount = useStoreActions((actions) => actions.addAccount);

    const performLogIn = async function () {
        const seed = await mnemonicToSeed(mnemonic);
        const account = await accountFromSeed(seed);

        // const derivation = await deriveSeed(seed, 0, 0)
        const {signature} = await signMessage('jmesworld', account.privateKey);
        console.log('PRIVATEKEY CREATE USER', account.privateKey);
        console.log(signature)
        await addUser({
            username,
            signature: signature
        });

        await addWallet({
            mnemonic: mnemonic,
            privateKey: account.privateKey,
            seed: seed,
        });
        const derivedAddress = account.address;
        console.log({derivedAddress})
        const path = `http://3.72.109.56:3001/identity/${username}`;
        const rawResponse = await fetch(path, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({address:derivedAddress})
        });
        await onChangeAddress(derivedAddress)
        await addAccount({index:0, title: 'default', address: derivedAddress});
        console.log({path});
        const contentResponse = await rawResponse.json();
        console.log(contentResponse);

        setTimeout(()=>{
            navigation.navigate("Root")

        }, 5000)
        // navigation.navigate("SetPin")
        // const path = `http://localhost:3001/identity/${_username}`;
    }
    useEffect(() => {
        async function generate() {
            const mnemonic = await generateMnemonic();
            onChangeMnemonic(mnemonic)
        }
        generate();
    }, []);

    return (
        <View style={styles.container}>
            <Background4>
                <Text style={styles.title}>Register</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text style={styles.secondTitle}>Username</Text>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Enter a username"
                    />
                </SafeAreaView>
                <Text style={styles.secondTitle}>Mnemonic</Text>

                <TextInput
                    style={styles.inputMultiline}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={onChangeMnemonic}
                    value={mnemonic}
                    editable={false}
                    placeholder="Enter your mnemonic"
                />

                <Pressable
                    onPress={ () => performLogIn()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
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
        height: '50%',
        alignItems: 'center',
        backgroundColor: "#fff",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        textAlign:"center",
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
        color: '#FFF',
    },
    iconImageView: {
        flexDirection: 'row'
    },

    button: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '80%',
        paddingTop: 15,
        paddingBottom: 15,
        color: '#FFF',
        backgroundColor:'#000',
        borderRadius: 6,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 24,
        textTransform: "uppercase",
        fontFamily: 'Roboto_900Black',
    },
    title: {
        fontSize: 36,
        color: '#FFF',
        fontFamily: 'Comfortaa_300Light',
    },
    input: {
        backgroundColor: "white",
        height: 40,
        margin: 12,
        width: '90%',
        borderWidth: 1,
        padding: 10,
    },
    inputMultiline: {
        backgroundColor: "white",
        margin: 12,
        width: '90%',
        borderWidth: 1,
        padding: 10,
    },
    secondTitle: {
        fontSize: 36,
        fontFamily: 'Comfortaa_300Light',
        paddingTop: 40,
        color: '#FFF'
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
