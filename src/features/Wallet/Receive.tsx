import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  ActionSheetIOS,
} from 'react-native'
import { getUserIdentity } from '../../utils'
import {
  Background,
  BackdropSmall,
  Navbar,
  View,
  Text,
  StyledButton as NextButton,
} from '../../components'
import { Navigation } from '../../types'
import { Route } from '@react-navigation/native'
import { useStoreState } from '../../hooks/storeHooks'
import QRCode from 'react-native-qrcode-svg' // Import QRCode component

type Props = {
  navigation: Navigation
}

const isIOS = Platform.OS === 'ios'
const isWeb = Platform.OS === 'web'

export default function ReceiveScreen({ navigation }: Props) {
  const address = useStoreState((state) => state.accounts[0].address)

  return (
    <View style={styles.container}>
      <Background>
        <View
          style={
            isWeb
              ? { height: 44, backgroundColor: 'transparent' }
              : { height: 'auto', backgroundColor: 'transparent' }
          }
        >
          <StatusBar style={isIOS ? 'light' : 'auto'} />
        </View>
        <Navbar
          title={'Receive'}
          navigation={navigation}
          children={'Root'}
        />
        <BackdropSmall>
          <Text style={styles.title}>Share Account</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              backgroundColor: 'transparent',
            }}
          >
            <QRCode value={address} size={168} color="#5136C2" />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 32,
              backgroundColor: 'transparent',
            }}
          >
            <Text
              style={{
                color: '#454E62',
                fontSize: 15,
                fontWeight: '400',
              }}
            >
              {address}
            </Text>
          </View>
          <View
            style={{
              marginTop: 55,
              backgroundColor: 'transparent',
            }}
          >
            <Text style={styles.title}>or</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 70,
              backgroundColor: 'transparent',
            }}
          >
            <Pressable
              style={styles.requestButton}
              onPress={async () => {
                navigation.navigate('ReceiveRequest')
              }}
            >
              <Text
                style={{
                  color: '#23262F',
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              >
                Request
              </Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <NextButton
              onPress={() => navigation.navigate('Root')}
              enabled={true}
            >
              Done
            </NextButton>
          </View>
        </BackdropSmall>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Background>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  requestButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 90,
    border: '1px solid #5136C2',
    fontSize: 16,
    height: 48,
    width: '48%',
  },
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 48,

    backgroundColor: 'transparent',
  },

  iconImageView: {
    flexDirection: 'row',
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#000000',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 10,
  },
  input: {
    placeholderTextColor: 'rgba(112, 79, 247, 0.5)',
    paddingLeft: 19,
    marginLeft: 14,
    marginRight: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 24,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    width: '90%',
    height: 60,
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
    paddingTop: 40,
  },
  balanceJMES: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  balanceEUR: {
    fontWeight: 'bold',
    flex: 0,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
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
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  noAssetText: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'center',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
