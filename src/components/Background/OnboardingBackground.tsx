import { memo } from 'react'
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native'

import { View } from '../Themed/Themed'
type Props = {
  children: React.ReactNode
  position?: String
}

const OnboardingBackground = ({ children, position }: Props) => (
  <ImageBackground
    source={require('../../../assets/images/onboarding.jpg')}
    resizeMode="cover"
    style={styles.background}
  >
    <KeyboardAvoidingView
      style={[
        styles.content,
        position === 'bottom' ? styles.bottom : undefined,
      ]}
      behavior="padding"
    >
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
})

export default memo(OnboardingBackground)
