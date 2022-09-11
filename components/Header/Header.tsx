import React, { memo } from "react";
import {Image, Pressable, StyleSheet, View} from "react-native";
import HeaderBalance from "../HeaderBalance/HeaderBalance";
import {Navigation} from "../../types";

type Props = {
    children: React.ReactNode;
    navigation: Navigation
};

const Header = ({ navigation }: Props) => (
    <View style={styles.header}>
        <Pressable
            onPress={() => navigation.navigate('Home')}
            style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row',
                color: '#FFF',
                justifyContent: 'flex-end'
            })}>
            <Image
                source={require('../../assets/images/logo192.png')}
                style={{
                    width: 30, height: 30,
                    justifyContent: 'flex-start',
                    alignSelf:"flex-start"
                    }}
            />
        </Pressable>
        <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row',
                color: '#FFF',
                justifyContent: 'flex-end'
            })}>
            <HeaderBalance navigation={navigation}/>
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        fontSize: 26,
        color: '#FFF',
        fontWeight: "bold",
    width: '100%',
    paddingTop: 45,
        paddingLeft: 25,
        paddingRight: 25,
    height: 80,
    backgroundColor: '#714FF8',
    },
});

export default memo(Header);
