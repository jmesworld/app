import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  Platform,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native'
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa'
import { Text, View } from '../../components/Themed/Themed'
import { useStoreActions } from '../../hooks/storeHooks'
import {
  restoreUserIdentity,
  getToken,
  storeInLocal,
} from '../../utils'
import Background4 from '../../components/Background4/Background4'
import { Roboto_900Black } from '@expo-google-fonts/roboto'
import { Navigation } from '../../types'

type Props = {
  navigation: Navigation
}

export default function LogUserScreen({ navigation }: Props) {
  const [mnemonic, onChangeMnemonic] = useState('')
  const [identity, setIdentity] = useState(undefined)
  // const [identity, setIdentity] = useState(
  //   async () => await restoreUserIdentity(mnemonic)
  // )

  const addWallet = useStoreActions((actions) => actions.addWallet)
  const addUser = useStoreActions((actions) => actions.addUser)
  const addAccount = useStoreActions((actions) => actions.addAccount)
  const addToken = useStoreActions((actions) => actions.addToken)

  //const addToken = useStoreActions((actions) => actions.setSecureToken)
  const fetchIdentity = async (mnemonic: string) => {
    setIdentity(await restoreUserIdentity(mnemonic))
    return identity
  }

  const handleAccountRestore = async (mnemonic: string) => {
    await fetchIdentity(mnemonic)
    await restoreUserIdentity(mnemonic)
      .then((identity) => {
        addToStore(identity, navigation)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // const handleAccountRestore = async (mnemonic: string) => {

  //   if (identity.account.signature.isVerified && identity.username) {
  //     await addUser({
  //       username: identity.username,
  //       signature: identity.account.signature,
  //     })

  //     await addWallet({
  //       mnemonic: mnemonic,
  //       privateKey: identity.account.privateKey,
  //     })

  //     await addAccount({
  //       index: 0,
  //       title: 'default',
  //       address: identity.account.address,
  //     })

  //     await addToken({
  //       token: await getToken(identity.account.response), // getToken returns tokenReq.data
  //     })
  //     await secureStorage.encryptToken(
  //       await getToken(identity.account.response)
  //     )
  //     setTimeout(() => {
  //       navigation.navigate('Root')
  //     }, 5000)
  //   } else {
  //     console.log('Invalid credentials, signature unverified')
  //     console.log(error)
  //   }
  // }

  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
    Roboto_900Black,
  })

  return (
    <View style={styles.container}>
      <Background4>
        <Text style={styles.title}>Log In</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <SafeAreaView>
          <Text style={styles.secondTitle}>Mnemonic</Text>

          <TextInput
            style={styles.inputMultiline}
            multiline={true}
            numberOfLines={4}
            onChangeText={onChangeMnemonic}
            value={mnemonic}
            placeholder="Enter your mnemonic"
          />
        </SafeAreaView>

        <Pressable
          onPress={() => handleAccountRestore(mnemonic)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Background4>
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
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Roboto_900Black',
    color: '#FFF',
  },
  iconImageView: {
    flexDirection: 'row',
  },

  button: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    paddingTop: 15,
    paddingBottom: 15,
    color: '#FFF',
    backgroundColor: '#000',
    borderRadius: 6,
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
  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 12,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
  inputMultiline: {
    backgroundColor: 'white',
    margin: 12,
    width: '90%',
    borderWidth: 1,
    padding: 10,
  },
  secondTitle: {
    fontSize: 36,
    fontFamily: 'Comfortaa_300Light',
    color: '#FFF',
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
