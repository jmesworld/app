import { useEffect } from 'react'
import { OnBoardingNavigate } from '../../navigation/onBoardingStack'
import {
  Backdrop,
  Background,
  TextTitle,
  TextInfo,
  Checkbox as CheckboxComponent,
  SeedList,
  Button,
  Input,
  Navbar,
  BackdropSmall,
} from '../../components'

import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  Pressable,
  Linking,
  View,
} from 'react-native'
import OnboardingNavbar from '../../components/Navbar/OnboardingNavbar'
import {
  useStoreState,
  useStoreActions,
} from '../../hooks/storeHooks'
import { OnBoardingPhase } from '../../store'
import QRCode from 'react-native-qrcode-svg'
import { useAppTheme } from '../../theme'
import { FAUCET_URL } from '@env'
console.log('FAUCET_URL', FAUCET_URL)
import { useQuery } from 'react-query'
import { useIdentityContext } from '../../contexts/IdentityService'
import { useClipboardTimeout } from '../../hooks/useClipboardTimeout'
import CopyIcon from '../../assets/copy.svg'
import CheckIcon from '../../assets/check.svg'
import GeneratedQRCode from '../../components/QRCode/QRCode'

type Props = {
  navigation: OnBoardingNavigate<'generateMnemonic'>
}

const TopUpScreen = ({ navigation }: Props) => {
  const [copied, copyToClipboard] = useClipboardTimeout()
  const { getBalance } = useIdentityContext()
  const { colors } = useAppTheme()
  const address = useStoreState(
    (state) => state.onBoarding.accountAddress
  )
  const mnemonic = useStoreState((state) => state.onBoarding.mnemonic)
  const balance = useStoreState((state) => state.onBoarding.balance)
  const setOnboardingPhase = useStoreActions(
    (actions) => actions.setOnboardingPhase
  )
  const setAccountBalance = useStoreActions(
    (actions) => actions.setBalance
  )

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ['Balance', address, mnemonic.join(' ')],
    queryFn: async ({ queryKey }) => {
      return getBalance(queryKey[1], queryKey[2])
    },
    refetchInterval: 1000,
  })
  useEffect(() => {
    if (data === undefined || isFetching || isLoading) return
    if (data > 0) {
      setAccountBalance(data / 1e6)
      navigation.replace('pickUsername')
    }
  }, [data])

  const handleOnFaucet = async () => {
    Linking.openURL(FAUCET_URL)
  }

  useEffect(() => {
    if (balance > 0) {
      navigation.replace('pickUsername')
    }
  }, [balance])

  useEffect(() => {
    setOnboardingPhase(OnBoardingPhase.topUp)
  }, [])

  return (
    <View style={styles.container}>
      <Background>
        <Navbar
          navigation={navigation}
          children="confirmGeneratedMnemonic"
        />
        <BackdropSmall>
          <ScrollView
            contentContainerStyle={styles.mainContentcontnetStyle}
            style={styles.contentContainer}
          >
            <TextTitle> Top up</TextTitle>
            <GeneratedQRCode
              payload={{
                address,
              }}
              size={168}
            />
            <Text style={styles.textInfo}>Your JMES address</Text>
            <SafeAreaView
              style={{
                marginTop: 15,
                paddingHorizontal: 10,
                height: 60,
                width: '100%',
              }}
            >
              <Input
                containerStyle={{
                  marginTop: 4,
                  borderRadius: 16,
                  backgroundColor: colors.bgInput,
                  borderWidth: 0,
                }}
                style={{
                  backgroundColor: colors.bgInput,
                }}
                value={`${address.substring(
                  0,
                  15
                )}...${address.substring(
                  address.length - 15,
                  address.length
                )}`}
                readonly
                placeholder={'Address or Name'}
                imgSource={
                  <Pressable
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'transparent',
                    }}
                    onPress={() => {
                      copyToClipboard(address, 2000)
                    }}
                  >
                    {copied ? (
                      <CheckIcon
                        width={20}
                        height={20}
                        color={colors.green}
                      />
                    ) : (
                      <CopyIcon height={20} width={20} />
                    )}
                  </Pressable>
                }
              />
            </SafeAreaView>
          </ScrollView>
          <SafeAreaView style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={async () => {
                await handleOnFaucet()
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
                Faucet
              </Text>
            </Button>
          </SafeAreaView>
        </BackdropSmall>
      </Background>
    </View>
  )
}
export default TopUpScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  contentContainer: {
    height: '70%',
    width: '100%',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 45,
  },
  mainContentcontnetStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    width: '93%',
    height: 49,
    marginTop: 12,
    marginBottom: 34,
  },
})
