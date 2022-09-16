import {useStoreState} from "../../hooks/storeHooks";
import {useEffect, useState} from "react";
import { Button, StyleSheet } from 'react-native';
import {Text, View} from '../../components/Themed/Themed';
import QRCode from 'react-native-qrcode-svg';
import { IQRCodePayload } from '../../lib/IQRCodePayload';

type Props = {
    payload: IQRCodePayload;
};

export default function GeneratedQRCode({payload}: Props){

    return (
        <View style={styles.container}>
            <QRCode size={200} value={JSON.stringify(payload) } />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 20
    }
});