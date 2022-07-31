import React, { memo } from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import { theme } from "../../core/theme";
import HeaderBalance from "../HeaderBalance/HeaderBalance";
import {white} from "react-native-paper/lib/typescript/styles/colors";
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
        // flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        // height: 500,
        // paddingLeft: 100,
        // paddingRight: 100,
        // paddingTop: '5%',
        // paddingBottom: '5%',
        // width: '100%',
        // backgroundColor: '#2d1c3e',
        fontSize: 26,
        color: '#FFF',
        fontWeight: "bold",
        // paddingVertical: 14,
    width: '100%',
    paddingTop: 45,
        paddingLeft: 25,
        paddingRight: 25,
    height: 80,
    // justifyContent: 'center',
    backgroundColor: '#714FF8',
    // justifyContent: 'flex-start',
    // alignContent: "flex-end"
    },
});

export default memo(Header);
