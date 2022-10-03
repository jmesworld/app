import React, { memo } from "react";
import { Background, Button } from "../../components";
import { Navigation } from "../../types";
import { View, Text } from "react-native";

type Props = {
  navigation: Navigation;
};

const OnboardingScreen = ({ navigation }: Props) => (
  <Background position="bottom">
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          height: 52,
          backgroundColor: "#FFF",
          marginLeft: 16,
          borderRadius: 6,
          width: "44.4%",
        }}
        onPress={() => navigation.navigate("LogUser")}
      >
        <View style={{ paddingTop: "5px" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 13,
            }}
          >
            LOGIN
          </Text>
        </View>
      </Button>
      <Button
        style={{
          height: 52,
          backgroundColor: "#353535",
          marginLeft: "3.2%",
          marginRight: 16,
          borderRadius: 6,
          width: "44.4%",
        }}
        onPress={() => navigation.navigate("CreateUser")}
      >
        <View style={{ paddingTop: "5px" }}>
          <Text
            style={{
              color: "#FFF",
              fontSize: 13,
            }}
          >
            Register
          </Text>
        </View>
      </Button>
    </View>
  </Background>
);

export default memo(OnboardingScreen);
