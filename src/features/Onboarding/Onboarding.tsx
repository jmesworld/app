import { memo } from 'react'
import { OnboardingBackground, Button } from '../../components'
import { Navigation } from '../../types'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { normalize } from 'path'
import 'react-native-get-random-values'

type Props = {
  navigation: Navigation
}
const ButtonContainer = ({ navigation }) => {
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
          style={{
            width: '48%',
            height: '100%',
            backgroundColor: '#FFF',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#C6B4FC',
            borderRadius: 90,
          }}
          onPress={() => navigation.navigate('SignUp')}
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
          style={{
            width: '48%',
            height: '100%',
            backgroundColor: '#704FF7',
            borderRadius: 90,
          }}
          onPress={() => navigation.navigate('Restore')}
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
const OnboardingScreen = ({ navigation }: Props) => (
  <OnboardingBackground position="bottom">
    <ButtonContainer navigation={navigation} />
  </OnboardingBackground>
)

export default OnboardingScreen
