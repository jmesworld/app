import React, { memo } from 'react'
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { View } from '../Themed/Themed'

type Props = {
  children: React.ReactNode
  position?: String
}
const isIOS = Platform.OS === 'ios'

const Background = ({ children, position }: Props) => (
  <ImageBackground
    source={require('../../../assets/images/background.jpg')}
    resizeMode="cover"
    style={styles.background}
  >
    <ScrollView
      contentContainerStyle={{ ...styles.scrollViewContent }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 44, backgroundColor: 'transparent' }}>
        <StatusBar style={isIOS ? 'light' : 'auto'} />
      </View>
      {children}
    </ScrollView>
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
})

export default memo(Background)
