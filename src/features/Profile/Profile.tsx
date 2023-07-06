import { Platform, StyleSheet, Pressable } from 'react-native'
import { Text, View } from '../../components/Themed/Themed'
import {
  useStoreActions,
  useStoreState,
} from '../../hooks/storeHooks'
import { useEffect, useState } from 'react'
import Background from '../../components/Background/Background'
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa'
import { Roboto_900Black } from '@expo-google-fonts/roboto'

import { Navigation } from '../../types'

type Props = {
  children: React.ReactNode
  navigation: Navigation
}

export default function ProfileScreen({ navigation }: Props) {
  const address = useStoreState((state) => state.accounts[0]?.address)
  const username = useStoreState(
    (state) => state.accounts[0].username
  )

  const resetStore = useStoreActions((actions) => actions.resetStore)

  const handleLogout = () => {
    resetStore(true)
  }

  return (
    <View style={styles.container}>
      <Background>
        <Text style={styles.title}>Profile</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.section}>Username</Text>
        <Text style={styles.username}>@{username}</Text>
        <Text style={styles.section}>Address</Text>
        <Text style={styles.address}>{address}</Text>

        <Pressable
          onPress={() => handleLogout()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
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
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#000000',
  },
  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    color: '#FFF',
    color: '#000000',
    paddingTop: 5,
    marginTop: 10,
    marginBottom: 15,
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    fontFamily: 'Comfortaa_300Light',
  },
  section: {
    fontWeight: 'bold',
    flex: 1,
    color: '#FFF',
    fontSize: 24,
    lineHeight: 28,
    paddingTop: 15,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_900Black',
    textTransform: 'uppercase',
  },
  username: {
    fontWeight: 'bold',
    flex: 1,
    color: '#FFF',
    alignSelf: 'center',
  },
  mnemonic: {
    flex: 1,
    alignSelf: 'flex-start',
    color: '#FFF',
    backgroundColor: '#f0af582b',
  },
  address: {
    fontWeight: 'bold',
    flex: 1,
    height: 40,
    fontSize: 10,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: '#f0af582b',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
