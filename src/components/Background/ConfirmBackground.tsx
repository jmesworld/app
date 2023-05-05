import { memo } from 'react'
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'

type Props = {
  children: React.ReactNode
  position?: String
}

const SignUpBackground = ({ children, position }: Props) => (
  <ImageBackground
    source={require('../../../assets/images/onboarding.jpg')}
    resizeMode="cover"
    style={styles.background}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.content,
        position === 'bottom' ? styles.bottom : undefined,
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
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
    width: '95%',
    height: '100%',
    marginTop: 44,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FCFCFD',
    borderRadius: 24,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default memo(SignUpBackground)
