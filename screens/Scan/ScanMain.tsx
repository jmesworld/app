import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, StyleSheet, Button, SafeAreaView } from "react-native";
import { LOCAL_SERVER_PATH } from "../../utils";
import { useStoreState, useStoreActions } from "../../hooks/storeHooks";
import { Navigation } from "../../types";
import { View } from "../../components";

type Props = {
  navigation: Navigation;
};

export default function ScanScreen({ navigation }: Props) {
  const account = useStoreState((state) => state.accounts[0]);
  const updateAccount = useStoreActions((actions) => actions.updateAccount);

  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(null);
  const [permission, setPermission] = useState(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.error(error);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async (_payload) => {
    if (payload) {
      const parsedPayload = payload.json();
      setPayload(parsedPayload);
    } else {
      console.error("error");
    }

    // @ts-ignore
    return navigation.navigate({
      name: "WalletSend",
      params: {
        payload,
      },
    });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {permission ? (
          <BarCodeScanner
            style={[styles.container]}
            onBarCodeScanned={() => handleScan(payload)}
          >
            <Text style={styles.text}>Scan the QR code.</Text>
          </BarCodeScanner>
        ) : (
          <Text style={styles.textError}>Permission rejected.</Text>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 15,
    backgroundColor: "white",
  },
  textError: {
    color: "red",
  },
});
