import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Text, View } from "../../components/Themed/Themed";
import { useEffect, useState } from "react";
import Background4 from "../../components/Background4/Background4";

import { Roboto_900Black } from "@expo-google-fonts/roboto";
import { Navigation } from "../../types";
import { Route } from "@react-navigation/native";

type Props = {
  navigation: Navigation;
  route: Route<any>;
};

export default function CreateAssetConfirmScreen({ navigation, route }: Props) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [shares, setShares] = useState(null);
  useEffect(() => {
    if (route.params) {
      if (route.params.image) setImage(route.params.image);
      if (route.params.title) setTitle(route.params.title);
      if (route.params.price) setPrice(route.params.price);
      if (route.params.shares) setShares(route.params.shares);
    }
  }, [route.params]);
  console.log("IMAGE", image);

  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.section}>Your asset was created!</Text>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <SafeAreaView style={styles.subcontainer}>
          <Text style={styles.secondTitle}>Title: {title}</Text>
          <Text style={styles.secondTitle}>Price: {price}</Text>
          <Text style={styles.secondTitle}>Shares: {shares}</Text>
        </SafeAreaView>
        <Pressable
          onPress={async () => {
            return navigation.navigate("Balance");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ok</Text>
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
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  subcontainer: {
    backgroundColor: "transparent",
    paddingBottom: 60,
  },
  buttonText: {
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
    color: "#000000",
  },
  iconImageView: {
    flexDirection: "row",
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    color: "#000000",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Roboto_900Black",
  },
  title: {
    fontSize: 36,
    fontFamily: "Comfortaa_300Light",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  secondTitle: {
    fontSize: 24,
    fontFamily: "Comfortaa_300Light",
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
