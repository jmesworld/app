import { useState } from 'react'
import {
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { Text, View } from '../../components/Themed/Themed'

import {
  Backdrop,
  BackdropSmall,
  Background,
  Button,
  Input,
  StyledButton,
  TextTitle,
} from '../../components'

import { Navigation } from '../../types'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import { Link } from '@react-navigation/native'

type Props = {
  navigation: Navigation
}
export default function SignUpScreen({ navigation }: Props) {
  const [username, onChangeUsername] = useState('')
  const [name, onChangeName] = useState('')
  const [validated, setValidated] = useState(false)

  const handleSignUp = async function () {
    // @ts-ignore
    return navigation.navigate({
      name: 'BackUp',
      params: {
        username,
        name,
      },
    })
  }

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="Onboarding"
        />

        <TextTitle> Create new account</TextTitle>
        <Text style={styles.inputTag}>FULL NAME</Text>
        <SafeAreaView style={styles.inputContainer}>
          <Input
            placeholder=""
            onChangeText={onChangeName}
            value={name}
          />
        </SafeAreaView>
        <Text style={styles.inputTag}>USERNAME</Text>
        <SafeAreaView style={styles.inputContainer}>
          <Input
            placeholder=""
            onChangeText={onChangeUsername}
            value={username}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.buttonContainer}>
          <StyledButton
            enabled={true}
            onPress={() => {
              handleSignUp()
            }}
          >
            <Text
              style={{
                textTransform: 'none',
                fontStyle: 'normal',
                color: '#FCFCFD',
                fontSize: 16,
                fontWeight: '700',
              }}
            >
              Sign up
            </Text>
          </StyledButton>
        </SafeAreaView>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>
            By signing up, you agree to our{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#704FF7',
              }}
              onPress={() =>
                Linking.openURL('https://icons.jmes.world/terms')
              }
            >
              Terms
            </Text>
            ,{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#704FF7',
              }}
              onPress={() =>
                Linking.openURL('https://icons.jmes.world/policy')
              }
            >
              Policy
            </Text>
            , and{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#704FF7',
              }}
              onPress={() =>
                Linking.openURL('https://icons.jmes.world/cookies')
              }
            >
              Cookies
            </Text>
            .
          </Text>
        </View>
      </Backdrop>
    </Background>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    flex: 1,
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: 44,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,

    backgroundColor: '#FCFCFD',
    borderRadius: 24,
  },

  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginTop: 19,
    marginBottom: 28,
    width: '100%',
    maxWidth: 356,
    height: 20,
  },
  text: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    color: '#704FF7',
    textAlign: 'center',
  },

  inputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '93%',
    height: 49,
    marginBottom: 22,
  },
  inputTag: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 7,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#704FF7',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    width: '93%',

    height: 49,
    backgroundColor: 'none',
  },

  policyContainer: {
    backgroundColor: 'transparent',
    width: '72%',
    height: 56,
    marginTop: 47,
  },
  policyText: {
    fontSize: 14,
    color: '#0F0056',
  },
})
