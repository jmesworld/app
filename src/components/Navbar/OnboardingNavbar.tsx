import React, { memo } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import { Navigation } from '../../types'
type Props = {
  children: string
  navigation: Navigation
  backButton?: boolean
  title?: string
}

const Navbar = ({ navigation, children, title }: Props) => (
  <View style={styles.navbar}>
    <View style={styles.backButtonContainer}>
      <Pressable
        onPress={() => navigation.navigate(children)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        })}
      >
        <Image
          source={require('../../../assets/icons/lilac-backarrow.png')}
          style={{}}
        />
      </Pressable>
    </View>
    <View style={styles.logoContainer}>
      <Image
        style={{ alignSelf: 'center' }}
        source={require('../../../assets/images/jmes-text-black.png')}
      />
    </View>
    <View style={styles.emptyContainer}></View>
  </View>
)

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 19,
    height: 23,
  },
  backButtonContainer: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
  },
})

export default memo(Navbar)
