import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";

import { Text, View } from "../../components/Themed/Themed";
import Background4 from "../../components/Background4/Background4";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { Roboto_500Medium, Roboto_900Black } from "@expo-google-fonts/roboto";
import { Navigation } from "../../types";

type Props = {
  navigation: Navigation;
};

export default function HomeScreen({ navigation }: Props) {
  const [assets, setAssets] = useState([
    {
      key: 1,
      title: "Abstract",
      price: "2,813.30",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Abstract.jpeg"),
      mocked: require("../../assets/images/mocked/Abstract.jpg"),
    },
    {
      key: 2,
      title: "Collage",
      price: "8,004",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Collage.jpg"),
      mocked: require("../../assets/images/mocked/Collage.jpg"),
    },
    {
      key: 3,
      title: "Design",
      price: "2,813.30",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Design.jpeg"),
      mocked: require("../../assets/images/mocked/Design.jpg"),
    },
    {
      key: 4,
      title: "Digital",
      price: "2,813.30",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Digital.jpeg"),
      mocked: require("../../assets/images/mocked/Digital.jpg"),
    },
    {
      key: 5,
      title: "Expressionism",
      price: "2,813.30",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Expressionism.jpeg"),
      mocked: require("../../assets/images/mocked/Expressionism.jpg"),
    },
    {
      key: 6,
      title: "Generative",
      price: "2,813.30",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Generative.png"),
      mocked: require("../../assets/images/mocked/Generative.jpg"),
    },
    {
      key: 7,
      title: "Impressionism",
      price: "2,813.30",
      shares: "800",
      description:
        "Money can't buy happiness but it's more comfortable to cry in Mercedes than a bicycle. #deklart #art #mercedes #nft #motivation #success",
      uri: require("../../assets/images/genres/Impressionism.jpeg"),
      mocked: require("../../assets/images/mocked/Impressionism.jpg"),
    },
  ]);
  const handleRedirect = async () => {};
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_500Medium,
    Roboto_900Black,
  });

  return (
    <View style={styles.container}>
      <Background4>
        <ScrollView>
          {assets.map((item) => {
            return (
              <View
                key={item.key}
                style={{
                  paddingBottom: 21,
                  backgroundColor: "transparent",
                }}
              >
                <Pressable
                  onPress={async () => {
                    // @ts-ignore
                    return navigation.navigate({
                      name: "Artwork",
                      params: {
                        image: item.uri,
                        mocked: item.mocked,
                        title: item.title,
                        price: item.price,
                        shares: item.shares,
                      },
                    });
                  }}
                >
                  <Image
                    source={item.uri}
                    style={{ width: 375, height: 267 }}
                  />
                </Pressable>

                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 20,
                    paddingTop: 5,
                    paddingLeft: 4,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
      </Background4>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 36,
    fontFamily: "Comfortaa_300Light",
  },
  description: {
    fontWeight: "bold",
    flex: 0,
    color: "#FFF",
    fontSize: 16,
    lineHeight: 18,
    paddingTop: 15,
    // alignSelf: "flex-start",
    fontFamily: "Roboto_500Medium",
    textTransform: "uppercase",
    width: "70%",
    alignSelf: "center",
  },
  section: {
    fontWeight: "bold",
    color: "#FFF",
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    paddingBottom: 25,
    // alignSelf: "flex-start",
    textTransform: "uppercase",
    width: "70%",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    textTransform: "uppercase",
  },
  item: {
    fontWeight: "bold",
    color: "#FFF",
    alignSelf: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
