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
import { Button } from "../../components";
import { Roboto_900Black } from "@expo-google-fonts/roboto";
import { Navigation } from "../../types";
import { Route } from "@react-navigation/native";

type Props = {
  navigation: Navigation;
  route: Route<any>;
};

export default function ArtworkScreen({ navigation, route }: Props) {
  const [image, setImage] = useState(null);
  const [mockedImage, setMockedImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [shares, setShares] = useState(null);
  useEffect(() => {
    if (route.params) {
      if (route.params.image) setImage(route.params.image);
      if (route.params.mocked) setMockedImage(route.params.mocked);
      if (route.params.title) setTitle(route.params.title);
      if (route.params.price) setPrice(route.params.price);
      if (route.params.shares) setShares(route.params.shares);
    }
  }, [route.params]);
  console.log("IMAGE", image);
  console.log("MOCKED", mockedImage);

  return (
    <Background4>
      <View style={styles.contentContainer}>
        <View
          style={{
            backgroundColor: "transparent",
            width: "100%",
            height: "100%",
          }}
        >
          {mockedImage && (
            <Image
              source={{ uri: mockedImage }}
              style={{ flex: 1, width: undefined, height: undefined }}
            />
          )}
        </View>

        {/*
        <View style={styles.subcontainer}>
          <Text style={styles.secondTitle}>Title: {title}</Text>
          <Text style={styles.secondTitle}>Price: {price}</Text>
          <Text style={styles.secondTitle}>Shares: {shares}</Text>
        </View>
        */}
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.buttonContainer}>
        <Button
          style={{
            height: 52,
            backgroundColor: "#FFF",
            marginLeft: 16,
            borderRadius: 6,
            width: "44.4%",
          }}
          onPress={() => navigation.navigate("Buy")}
        >
          <View style={{ paddingTop: "5px" }}>
            <Text
              style={{
                color: "#000",
                fontSize: 13,
              }}
            >
              Buy
            </Text>
          </View>
        </Button>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Sell")}
        >
          <View style={{ paddingTop: "5px", backgroundColor: "transparent" }}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 13,
              }}
            >
              Sell
            </Text>
          </View>
        </Button>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Background4>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  subcontainer: {
    backgroundColor: "transparent",
    paddingBottom: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  button: {
    height: 52,
    backgroundColor: "#353535",
    marginLeft: "3.2%",
    marginRight: 16,
    borderRadius: 6,
    width: "44.4%",
  },
  separator: {
    height: 3,
    width: "100%",
  },
  secondTitle: {
    fontSize: 24,
    fontFamily: "Comfortaa_300Light",
  },
});
