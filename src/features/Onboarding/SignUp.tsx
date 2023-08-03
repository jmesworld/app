import { useMemo, useState } from 'react'
import {
  Alert,
  Linking,
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
  Modal,
  Navbar,
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
import { OnBoardingNavigate } from '../../navigation/onBoardingStack'
import { useIdentityContext } from '../../contexts/IdentityService'
import {
  useStoreActions,
  useStoreState,
} from '../../hooks/storeHooks'

type Props = {
  navigation: OnBoardingNavigate<'pickUsername'>
}

type Input = {
  value: string
  error: string | null
}

export default function PickUsernameScreen({ navigation }: Props) {
  const { createIdentity } = useIdentityContext()
  const mnemonic = useStoreState((state) => state.onBoarding.mnemonic)
  const setUsername = useStoreActions(
    (actions) => actions.setUsername
  )
  const resetState = useStoreActions((actions) => actions.resetStore)

  const [creatingIdentity, setCreatingIdentity] = useState(false)
  const [username, onChangeUsername] = useState<Input>({
    value: '',
    error: null,
  })

  const debouncedUsername = useDebounce({
    value: username.value,
    delay: 500,
  })

  const identity = useIdentity(debouncedUsername, !!username.error)
  const createUser = async () => {
    try {
      await createIdentity(username.value, mnemonic.join(' '))
      setUsername(username.value)
      navigation.push('createPin')
    } catch (e) {
      console.error(e)
    }
  }
  const handleSignUp = async function () {
    setCreatingIdentity(true)
    setTimeout(() => {
      createUser().finally(() => {
        setCreatingIdentity(false)
      })
    }, 100)
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
  const nameFromIdentityServiceError = useMemo(() => {
    if (debouncedUsername !== username.value) {
      return null
    }
    if (identity.error) {
      return identity.error.message
    }
    if (identity?.data?.identity?.name === debouncedUsername) {
      return 'Username already taken'
    }
    return null
  }, [debouncedUsername, identity])

  const submitDisabled = useMemo(() => {
    return (
      !!username.error ||
      username.value === '' ||
      !!nameFromIdentityServiceError ||
      identity.loading ||
      username.value !== debouncedUsername
    )
  }, [
    username,
    nameFromIdentityServiceError,
    debouncedUsername,
    identity,
  ])

  const handleBack = () => {
    Alert.alert('Are you sure?', 'You will lose your progress', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Leave',
        onPress: () => {
          resetState(true)
          navigation.navigate('welcome')
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Background>
        <Navbar
          handleBack={handleBack}
          navigation={navigation}
          children="topUp"
        />
        <BackdropSmall>
          <TextTitle> Create new account</TextTitle>

          <Text style={styles.inputTag}>USERNAME</Text>
          <SafeAreaView style={styles.inputContainer}>
            <Input
              error={username.error || nameFromIdentityServiceError}
              success={
                !!(
                  username.error === null &&
                  nameFromIdentityServiceError === null &&
                  !identity.loading &&
                  username.value
                )
              }
              onChangeText={onUsernameChange}
              value={username.value}
            />

            <HelperText
              type={identity.loading ? 'info' : 'error'}
              visible={!identity.loading}
            >
              {identity.loading &&
                'Checking username availability...'}
              {(!identity.loading && username.error) ||
                nameFromIdentityServiceError}
            </HelperText>
          </SafeAreaView>
          <SafeAreaView style={styles.buttonContainer}>
            <Button
              mode="contained"
              loading={creatingIdentity}
              rounded="full"
              disabled={submitDisabled || creatingIdentity}
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
        </BackdropSmall>
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
