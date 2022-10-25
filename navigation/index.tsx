/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
//@ts-nocheck

import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, Image } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFound/NotFound";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ScanScreen from "../screens/Scan/Scan";
import CreateUserScreen from "../screens/CreateUser/CreateUser";
import SignUpScreen from "../screens/CreateUser/SignUp";
import BackUpScreen from "../screens/BackUp/BackUp";
import LogUserScreen from "../screens/LogUser/LogUser";
import GalleryScreen from "../screens/Gallery/Gallery";
import Header from "../components/Header/Header";
import HeaderBalance from "../components/HeaderBalance/HeaderBalance";
import HomeScreen from "../screens/Home/Home";
import MarketplaceScreen from "../screens/Marketplace/Marketplace";
import EventsScreen from "../screens/Events/Events";
import ProfileScreen from "../screens/Profile/Profile";
import WalletScreen from "../screens/Wallet/Wallet";
import WalletSendScreen from "../screens/WalletSend/WalletSend";
import WalletSendConfirmScreen from "../screens/WalletSendConfirm/WalletSendConfirm";
import WalletReceiveScreen from "../screens/WalletReceive/WalletReceive";
import WalletReceiveConfirmScreen from "../screens/WalletReceiveConfirm/WalletReceiveConfirm";
import CreateAssetScreen from "../screens/CreateAsset/CreateAsset";
import CreateAssetConfirmScreen from "../screens/CreateAssetConfirm/CreateAssetConfirm";
import SendAssetScreen from "../screens/SendAsset/SendAsset";
import SendAssetConfirmScreen from "../screens/SendAssetConfirm/SendAssetConfirm";
import OnboardingScreen from "../screens/Onboarding/Onboarding";
import SetPinScreen from "../screens/SetPin/SetPin";
import ArtworkScreen from "../screens/Artwork/Artwork";
import { useStoreState } from "../hooks/storeHooks";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
// const contacts_white = require('../assets/icons/contacts_white.png')

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const hasWallet = useStoreState((state) => state.hasWallet);
  // const hasWallet = false;
  useStoreState((state) => console.log(state));

  if (hasWallet) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen
          name="SetPin"
          component={SetPinScreen}
          options={{ headerShown: false }}
        />
        {/*<Stack.Group*/}
        {/*    screenOptions={{presentation: 'modal'}}>*/}
        {/*    <Stack.Screen*/}
        {/*        name="Profile"*/}
        {/*        component={ProfileScreen}/>*/}
        {/*        /!*options={({navigation}: RootTabScreenProps<'Profile'>) => ({*!/*/}
        {/*        /!*    title: 'Profile',*!/*/}
        {/*        /!*    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,*!/*/}
        {/*        /!*    header: () => (*!/*/}
        {/*        /!*        <Header navigation={navigation} />*!/*/}
        {/*        /!*    ),*!/*/}
        {/*        /!*})*!/*/}
        {/*</Stack.Group>*/}
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="WalletSend"
            component={WalletSendScreen}
            options={{ presentation: "card", title: "Send to user" }}
          />
          {/*options={({navigation}: RootTabScreenProps<'Profile'>) => ({*/}
          {/*    title: 'Profile',*/}
          {/*    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,*/}
          {/*    header: () => (*/}
          {/*        <Header navigation={navigation} />*/}
          {/*    ),*/}
          {/*})*/}
          <Stack.Screen name="Artwork" component={ArtworkScreen} />
          <Stack.Screen
            name="WalletSendConfirm"
            component={WalletSendConfirmScreen}
            options={{ presentation: "card", title: "Confirm sending to user" }}
          />
          <Stack.Screen
            name="WalletReceive"
            component={WalletReceiveScreen}
            options={{ presentation: "card", title: "Receive request" }}
          />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="CreateAsset" component={CreateAssetScreen} />
          <Stack.Screen
            name="CreateAssetConfirm"
            component={CreateAssetConfirmScreen}
          />
          <Stack.Screen name="SendAsset" component={SendAssetScreen} />
          <Stack.Screen
            name="SendAssetConfirm"
            component={SendAssetConfirmScreen}
          />
          <Stack.Screen
            name="WalletReceiveConfirm"
            component={WalletReceiveConfirmScreen}
            options={{ presentation: "card", title: "Confirm receive request" }}
          />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator style={{ backgroundColor: "#000", height: "100%" }}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          style={{ backgroundColor: "#000", height: "100%" }}
          component={SignUpScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="BackUp"
          style={{ backgroundColor: "#000", height: "100%" }}
          component={BackUpScreen}
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="LogUser"
          component={LogUserScreen}
          options={{ headerShown: true, title: "Log in" }}
        />
        <Stack.Screen
          name="SetPin"
          component={SetPinScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      style={{ backgroundColor: "#000", height: "100%" }}
      initialRouteName="Balance"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        style={{ backgroundColor: "#000", height: "100%" }}
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarLabel: "",
          tabBarActiveBackgroundColor: "#222",
          tabBarInactiveBackgroundColor: "#000",

          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          header: () => <Header navigation={navigation} />,
        })}
      />

      <BottomTab.Screen
        name="Profile"
        style={{ backgroundColor: "#000" }}
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "Profile",
          tabBarLabel: "",
          tabBarActiveBackgroundColor: "#222",

          tabBarInactiveBackgroundColor: "#000",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          header: () => <Header navigation={navigation} />,
        })}
      />

      <BottomTab.Screen
        name="Scanner"
        style={{ backgroundColor: "#000" }}
        component={ScanScreen}
        options={({ navigation }: RootTabScreenProps<"Scanner">) => ({
          title: "Scanner",
          tabBarLabel: "",
          tabBarActiveBackgroundColor: "#222",
          tabBarInactiveBackgroundColor: "#000",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="scanner" color={color} />
          ),
          header: () => <Header navigation={navigation} />,
        })}
      />
      <BottomTab.Screen
        name="Balance"
        style={{ backgroundColor: "#000", width: "100%" }}
        component={WalletScreen}
        options={({ navigation }: RootTabScreenProps<"Balance">) => ({
          title: "Balance",
          tabBarLabel: "",
          tabBarActiveBackgroundColor: "#222",
          tabBarInactiveBackgroundColor: "#000",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account" color={color} />
          ),
          header: () => <Header navigation={navigation} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

// Incubator -> Proposals / Rewards
// Art market -> Primary markets / secondary markets
// Gallry / Scan sign
// memberships
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIconFontAwesome(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  // @ts-ignore
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIcon(props: { name: string; color: string }) {
  let sourcePath;
  // let icon = contacts_white
  const style = { width: 30, height: 30, marginLeft: 5 };
  switch (props.name) {
    case "home":
      return (
        <Image source={require("../assets/icons/home.png")} style={style} />
      );
      break;
    case "search":
      return (
        <Image
          source={require("../assets/icons/search_icon.png")}
          style={style}
        />
      );
      break;
    case "profile":
      return (
        <Image
          source={require("../assets/icons/search_icon.png")}
          style={style}
        />
      );
      break;
    case "create":
      return (
        <Image source={require("../assets/icons/create.png")} style={style} />
      );
      break;
    case "calendar":
      return (
        <Image
          source={require("../assets/icons/events_white.png")}
          style={style}
        />
      );
      break;
    case "scanner":
      return (
        <Image
          source={require("../assets/icons/scan_white.png")}
          style={style}
        />
      );
      break;
    case "account":
      return (
        <Image
          source={require("../assets/icons/account_icon.png")}
          style={style}
        />
      );
      break;
    case "contacts":
      return (
        <Image
          source={require("../assets/icons/contacts_white.png")}
          style={style}
        />
      );
      break;
    case "shop":
      return (
        <Image
          source={require("../assets/icons/shop_white.png")}
          style={style}
        />
      );
      break;
  }

  // @ts-ignore
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
