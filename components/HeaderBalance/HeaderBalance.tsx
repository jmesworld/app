import { Text, View } from '../Themed/Themed';
import * as React from "react";
import useColorScheme from "../../hooks/useColorScheme";
import {Image, Pressable} from "react-native";
import {Navigation} from "../../types";
import {useStoreState} from "../../hooks/storeHooks";
import {useEffect, useState} from "react";
import {fetchAddressBalance} from "../../utils";
import Web3 from "web3";


type Props = {
    children: React.ReactNode;
    navigation: Navigation
};
export default function HeaderBalance({navigation}: Props) {
    const useBalanceState = useStoreState((state) => state.accounts[0].balance)
    const address = useStoreState((state) => state.accounts[0].address)
    const [balance, setBalance] = useState(parseFloat(useBalanceState).toFixed(4));
    const [balanceEur, setBalanceEur] = useState(useBalanceState);

    useEffect(() => {
        async function fetch() {
            const fetchedBalance = await fetchAddressBalance(address);
            console.log({fetchedBalance});
            setBalance(Web3.utils.fromWei(fetchedBalance, 'ether'));
            const convertedBalance = (parseInt(fetchedBalance) * 0.1412840103).toString();
            
            console.log({convertedBalance});
            setBalanceEur(parseFloat(Web3.utils.fromWei(convertedBalance, 'ether')).toFixed(2))
        }

        fetch();
       
    }, []);

    return (
        <View style={{flexDirection: 'row', justifyContent:"flex-end", width: 200, backgroundColor: "translucent"}}>
            <Pressable
                onPress={() => navigation.navigate('Balance')}
                style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    color: '#FFF',
                    justifyContent: 'flex-end'
                })}>
                <Image
                    source={require('../../assets/icons/jmes_droplet_logo.png')}
                    style={{width: 20, height: 27}}
                />
            </Pressable>
            <Text style={{color:'#FFF', fontSize: 24, maxWidth: 125, paddingLeft: 5,paddingRight: 20}}>{parseFloat(balance).toFixed(4)}</Text>
            <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={({pressed}) => ({
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    color: '#FFF',
                    justifyContent: 'flex-end'
                })}>
                <Image
                    source={require('../../assets/icons/profile.png')}
                    style={{width: 30, height: 30}}
                />
            </Pressable>

        </View>
    );
}
