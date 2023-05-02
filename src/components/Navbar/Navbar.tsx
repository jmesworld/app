import React, { memo } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  StatusBar,
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
          source={require('../../../assets/icons/backarrow.png')}
          style={{
            marginTop: 2,
            width: 10,
            height: 16,
          }}
        />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '54.7%',
    marginRight: 'auto',
    marginLeft: 23,

    marginBottom: 21,
    height: 23,
  },
  title: {
    marginLeft: 18,
    lineHeight: 18,
    fontSize: 18,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
})

export default memo(Navbar)
