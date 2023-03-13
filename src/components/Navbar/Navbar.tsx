import React, { memo } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'

import { Navigation } from '../../types'
type Props = {
  children: string
  navigation: Navigation
}

const Navbar = ({ navigation, children }: Props) => (
  <View style={styles.navbar}>
    <View style={styles.toolbar}>
      <Pressable
        onPress={() => navigation.navigate(children)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,

          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        })}
      >
        <Image
          source={require('../../assets/icons/lilac-backbutton.svg')}
          style={{
            marginTop: 2,
            width: 10,
            height: 16,
          }}
        />
      </Pressable>
      <Image
        source={require('../../assets/images/JMESText.svg')}
        style={{
          // position: 'absolute',
          // right: '42%',
          // marginLeft: 'auto',
          width: 80,
          height: 23,
          // justifyContent: 'center',
          // alignSelf: 'center',
        }}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  navbar: {
    width: '54.7%',
    marginRight: 'auto',
    marginLeft: 23,
    marginTop: 21,
    height: 23,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default memo(Navbar)
