import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Text, View } from "../../components/Themed/Themed";
import { useState, useEffect } from "react";
import { generateMnemonic } from "../../utils";
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

type Props = {
  navigation: Navigation;
};
export default function SignUpScreen({ navigation }: Props) {
  const [username, onChangeUsername] = useState("");
  const [mnemonic, onChangeMnemonic] = useState("");
  const [name, onChangeName] = useState("");

  useEffect(() => {
    async function generate() {
      const mnemonic = await generateMnemonic();
      onChangeMnemonic(mnemonic);
    }
    generate();
  }, []);

  const handleSignUp = async function () {
    // @ts-ignore
    return navigation.navigate({
      name: "BackUp",
      params: {
        username,
        name,
        mnemonic,
      },
    });
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
    <View style={styles.container}>
      <Background4>
        <Text style={styles.title}>JMES</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.secondTitle}>SIGN UP TO JMES</Text>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Full Name"
          />
        </SafeAreaView>
        <SafeAreaView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Username"
          />
        </SafeAreaView>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              handleSignUp();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </Pressable>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>
            By signing up you agree to our Terms, Privacy Policy and Cookies
            Policy
          </Text>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </Background4>
    </View>
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
    marginBottom: 13,
    borderRadius: 6,
  },
  inputContainer: {
    width: "72%",
    marginBottom: 33,
  },
  policyContainer: {
    backgroundColor: "transparent",
    width: "72%",
    height: 56,
  },
  policyText: {
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
    paddingBottom: 26,
    color: "#FFF",
  },

  separator: {
    marginTop: 9,
    marginBottom: 18,
    height: 1,
    width: "80%",
  },
});
