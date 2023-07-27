import { memo, useEffect } from 'react'
import { OnboardingBackground, Button } from '../../components'
import { Navigation } from '../../types'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { normalize } from 'path'
import 'react-native-get-random-values'
import { OnBoardingNavigate } from '../../navigation/onBoardingStack'
import { useStoreActions } from '../../hooks/storeHooks'
import { OnBoardingPhase } from '../../store'

type Props = {
  navigation: OnBoardingNavigate<'welcome'>
}
const ButtonContainer = ({ navigation }: Props) => {
  const setOnboardingPhase = useStoreActions(
    (actions) => actions.setOnboardingPhase
  )

  useEffect(() => {
    setOnboardingPhase(OnBoardingPhase.welcome)
  }, [])
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
        marginLeft: 10,
        marginRight: 10,
        height: 80,
        marginBottom: 10,
        backgroundColor: '#FCFCFD',
        borderRadius: 90,
      }}
    >
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 17,
          marginBottom: 15,
          height: 48,
        }}
      >
        <Button
          mode="outlined"
          rounded="full"
          width={'48%'}
          onPress={() => navigation.push('generateMnemonic')}
        >
          <Text
            style={{
              textTransform: 'none',
              fontStyle: 'normal',
              color: '#23262F',
              fontSize: 16,
              fontWeight: '700',
            }}
          >
            Sign up
          </Text>
        </Button>

        <Button
          rounded="full"
          mode="contained"
          width={'48%'}
          onPress={() => navigation.push('restoreMnemonic')}
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
            Restore
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}
const WelcomeScreen = ({ navigation }: Props) => (
  <OnboardingBackground position="bottom">
    <ButtonContainer navigation={navigation} />
  </OnboardingBackground>
)

export default WelcomeScreen
