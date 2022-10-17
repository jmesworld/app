import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { LOCAL_SERVER_PATH } from "../../utils";
import { Text, View } from "../../components/Themed/Themed";
import { useStoreActions, useStoreState } from "../../hooks/storeHooks";
import React, { useEffect } from "react";
import {
  accountFromSeed,
  generateMnemonic,
  mnemonicToSeed,
  signMessage,
} from "../../utils";
import Background4 from "../../components/Background4/Background4";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { Roboto_900Black } from "@expo-google-fonts/roboto";

import { Navigation } from "../../types";

type Props = {
  navigation: Navigation;
};

export default function CreateUserScreen({ navigation }: Props) {
  const [username, onChangeUsername] = React.useState("");
  const [mnemonic, onChangeMnemonic] = React.useState("");
  const [address, onChangeAddress] = React.useState("");
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_900Black,
  });

  const addWallet = useStoreActions((actions) => actions.addWallet);
  const addUser = useStoreActions((actions) => actions.addUser);
  const addAccount = useStoreActions((actions) => actions.addAccount);
  //const balanceState = useStoreState((state) => state.accounts[0].balance)

  const performRegister = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    const account = await accountFromSeed(seed);
    const balance = 10000;
    const { signature } = await signMessage("jmesworld", account.privateKey);

    await addUser({
      username,
      signature: signature,
    });
    await addWallet({
      mnemonic: mnemonic,
      privateKey: account.privateKey,
      seed: seed,
    });

    const derivedAddress = account.address;
    //const path = `http://localhost:3000/users`;
    const path = `${LOCAL_SERVER_PATH}/users`;
    const rawResponse = await fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: derivedAddress,
        username,
        balance,
        mnemonic,
      }),
    });

    await onChangeAddress(derivedAddress);
    await addAccount({ index: 0, title: "default", address: derivedAddress });

    const contentResponse = await rawResponse.json();
    console.log(contentResponse);

    setTimeout(() => {
      navigation.navigate("Root");
    }, 5000);
  };

  useEffect(() => {
    async function generate() {
      const mnemonic = await generateMnemonic();
      onChangeMnemonic(mnemonic);
    }
    generate();
  }, []);

  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.title}>Register</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
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

        <Pressable onPress={() => performRegister()} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </Background4>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "50%",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
    color: "#FFF",
  },
  iconImageView: {
    flexDirection: "row",
  },

  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "80%",
    paddingTop: 15,
    paddingBottom: 15,
    color: "#FFF",
    backgroundColor: "#000",
    borderRadius: 6,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },
  title: {
    fontSize: 36,
    color: "#FFF",
    fontFamily: "Comfortaa_300Light",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    width: "90%",
    borderWidth: 1,
    padding: 10,
  },
  inputMultiline: {
    backgroundColor: "white",
    margin: 12,
    width: "90%",
    borderWidth: 1,
    padding: 10,
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: "Comfortaa_300Light",
    paddingTop: 40,
    color: "#FFF",
  },
  balanceJMES: {
    fontWeight: "bold",
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },
  balanceEUR: {
    fontWeight: "bold",
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },
  buttonImage: {
    padding: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: 10,
  },
  section: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "flex-start",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },
  noAssetText: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: "center",
    fontFamily: "Roboto_900Black",
    textTransform: "uppercase",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
