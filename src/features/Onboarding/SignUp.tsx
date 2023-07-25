import { useMemo, useState } from 'react'
import { Linking, SafeAreaView, StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed/Themed'
import {
  Backdrop,
  Background,
  Button,
  Input,
  TextTitle,
} from '../../components'

import { Navigation } from '../../types'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import {
  alphaNumericSchema,
  capitalNameSchema,
  daoNameSchema,
} from '../../validations/name'
import { HelperText } from 'react-native-paper'
import { useDebounce } from '../../hooks/useDebounce'
import { useIdentity } from '../../hooks/useIdentity'

type Props = {
  navigation: Navigation
}

type Input = {
  value: string
  error: string | null
}

export default function SignUpScreen({ navigation }: Props) {
  const [username, onChangeUsername] = useState<Input>({
    value: '',
    error: null,
  })

  const debouncedUsername = useDebounce({
    value: username.value,
    delay: 500,
  })

  // TODO: implement useIdentity
  const identity = useIdentity(debouncedUsername)

  const handleSignUp = async function () {
    // @ts-ignore
    return navigation.navigate({
      name: 'SetPin',
      params: {
        username,
        name,
      },
    })
  }

  const onUsernameChange = (input) => {
    let inputValue = input
    let error = null
    if (
      input !== '' &&
      !alphaNumericSchema.safeParse(input).success
    ) {
      return
    }

    if (capitalNameSchema.safeParse(inputValue).success) {
      inputValue = inputValue.toLowerCase()
    }

    const parsed = daoNameSchema('Username').safeParse(inputValue)
    if ('error' in parsed) {
      error = parsed.error.issues[0].message
    }

    onChangeUsername({
      value: inputValue,
      error,
    })
  }

  const submitDisabled = useMemo(() => {
    return !(!username.error && username.value !== '')
  }, [username, name])

  return (
    <Background>
      <Backdrop>
        <OnboardingNavbar
          navigation={navigation}
          children="Confirm"
        />

        <TextTitle> Create new account</TextTitle>

        <Text style={styles.inputTag}>USERNAME</Text>
        <SafeAreaView style={styles.inputContainer}>
          <Input
            error={username.error}
            success={!!(username.error === null && username.value)}
            onChangeText={onUsernameChange}
            value={username.value}
          />
          <HelperText type="error" visible={!!username.error}>
            {username.error}
          </HelperText>
        </SafeAreaView>
        <SafeAreaView style={styles.buttonContainer}>
          <Button
            mode="contained"
            rounded="full"
            disabled={submitDisabled}
            onPress={handleSignUp}
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
          </Button>
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
    alignItems: 'flex-start',

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
    marginTop: 20,
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
