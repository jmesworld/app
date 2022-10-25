import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { LOCAL_SERVER_PATH } from "../../utils";
import { Text, View } from "../../components/Themed/Themed";
import { useStoreActions, useStoreState } from "../../hooks/storeHooks";
import { useEffect, useState } from "react";
import { accountFromSeed, mnemonicToSeed, signMessage } from "../../utils";
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
import { GFSDidot_400Regular } from "@expo-google-fonts/gfs-didot";
import { Navigation } from "../../types";
import { Route } from "@react-navigation/native";
type Props = {
  navigation: Navigation;
  route: Route<any>;
};

export default function BackUpScreen({ navigation, route }: Props) {
  const [username, setUsername] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (route.params) {
      if (route.params.address) setAddress(route.params.address);
      if (route.params.username) setUsername(route.params.username);
      if (route.params.name) setName(route.params.name);
      if (route.params.mnemonic) setMnemonic(route.params.mnemonic);
    }
  }, [route.params]);

  const addWallet = useStoreActions((actions) => actions.addWallet);
  const addUser = useStoreActions((actions) => actions.addUser);
  const addAccount = useStoreActions((actions) => actions.addAccount);

  const performRegister = async function () {
    const seed = await mnemonicToSeed(mnemonic);
    const account = await accountFromSeed(seed);
    const balance = 10000;
    const { signature } = await signMessage("jmesworld", account.privateKey);
    const derivedAddress = account.address;
    const path = `${LOCAL_SERVER_PATH}/users`;
    await fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: derivedAddress,
        name,
        username,
        balance,
        mnemonic,
      }),
    });
    await addUser({
      username,
      signature: signature,
    });
    await addWallet({
      mnemonic: mnemonic,
      privateKey: account.privateKey,
      seed: seed,
    });
    await addAccount({ index: 0, title: "default", address: derivedAddress });
    setTimeout(() => {
      navigation.navigate("Root");
    }, 5000);
  };

  const SeedList = () => {
    return (
      <SafeAreaView style={styles.mnemonicContainer}>
        {mnemonic.split(" ").map((word, index) => (
          <View key={index} style={styles.seedWordContainer}>
            <Text style={styles.seedWordText} key={word}>
              {word}
            </Text>
            <View
              style={styles.seedWordSeperator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            <Text style={styles.seedWordNumber}> {index + 1} </Text>
          </View>
        ))}
      </SafeAreaView>
    );
  };

  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_900Black,
    GFSDidot_400Regular,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Background4>
        <Text style={styles.title}>JMES</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.secondTitle}>BACKUP RECOVERY PHRASE</Text>
        <SafeAreaView style={styles.textContainer}>
          <Text style={styles.text}>
            Write down your recovery phrase somewhere safe. If you lose or
            damage this device, it's the only way to recover your account
          </Text>
        </SafeAreaView>
        <SeedList />
        <SafeAreaView style={styles.checkboxContainer}>
          <Checkbox
            color="white"
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.text}>
            I confirm I have written down a copy of my recovery phrase
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              performRegister();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>CONFIRM</Text>
          </Pressable>
        </SafeAreaView>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </Background4>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "72%",
    height: 52,
    // marginTop: 35,
    // marginBottom: 13,
    margin: "auto",
    borderRadius: 6,
  },

  textContainer: {
    backgroundColor: "transparent",
    width: "76.2%",
    height: 68,
    margin: "auto",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "76.2%",
    height: 36,
    marginTop: 29,
  },
  mnemonicContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "76.2%",
    height: 314,
    // marginTop: 22,
    // marginBottom: 29,
    margin: "auto",
    gap: "10px 14px",
  },
  seedWordContainer: {
    display: "flex",
    backgroundColor: "transparent",
    maxWidth: "33.3%",
    minWidth: "16.65%",
    maxHeight: "25%",
    minHeight: "16.6%",
    alignItems: "center",
  },
  seedWordText: {
    color: "#FFFFFF",
  },
  seedWordSeperator: {
    marginTop: 3,
    marginBottom: 3,
    height: 1,
    width: "100%",
  },
  seedWordNumber: {
    color: "#FFFFFF",
  },
  text: {
    fontSize: 15,
    color: "#ABABAB",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
    color: "#000",
  },
  iconImageView: {
    flexDirection: "row",
  },
  button: {
    paddingTop: 17,
    paddingBottom: 17,
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingLeft: 52,
    paddingRight: 53,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },
  input: {
    backgroundColor: "#5B5B5B",
    height: 34,
    borderRadius: 6,
    paddingLeft: 18,
  },
  title: {
    fontSize: 42,
    fontFamily: "GFSDidot_400Regular",
    color: "#FFF",
  },
  secondTitle: {
    fontSize: 20,
    fontFamily: "Comfortaa_300Light",
    textTransform: "uppercase",
    // paddingBottom: 26,
    color: "#FFF",
  },
  separator: {
    marginTop: 9,
    marginBottom: 18,
    height: 1,
    width: "80%",
  },
});
