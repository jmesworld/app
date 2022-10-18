import React, { memo } from "react";
import { Background, Button } from "../../components";
import { Navigation } from "../../types";
import { View, Text } from "react-native";
import { normalize } from "path";
import 'react-native-get-random-values'
import {Client,Mnemonic} from 'jmes';

type Props = {
  navigation: Navigation;
};

console.log(crypto.getRandomValues(new Uint8Array(32)));
const client = new Client();
// console.log(client);
// console.log(new Mnemonic());
const randomBytes = crypto.getRandomValues(new Uint8Array(32));
// @ts-ignore
const mnemonic = Mnemonic.generateMnemonic(randomBytes);
console.log(mnemonic);
//@ts-ignore
const wallet = client.createWallet(new Mnemonic(mnemonic));
console.log(wallet);
// //@ts-ignore
const account = wallet.getAccount();
console.log(account);
console.log(account.getAddress());

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
        //onPress={() => navigation.navigate("CreateUser")}
        onPress={() => navigation.navigate("SignUp")}
      >
        <View style={{ paddingTop: "5px" }}>
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            SIGN UP
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
        onPress={() => navigation.navigate("LogUser")}
      >
        <View style={{ paddingTop: "5px" }}>
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            RESTORE
          </Text>
        </View>
      </Button>
    </View>
  </Background>
);

export default memo(OnboardingScreen);
