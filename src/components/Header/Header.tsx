import React, { memo } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import HeaderBalance from '../HeaderBalance/HeaderBalance'

import { Navigation } from '../../types'
type Props = {
  children: React.ReactNode
  navigation: Navigation
}

const Header = ({ navigation }: Props) => (
  <View style={styles.header}>
    <Pressable
      onPress={() => navigation.navigate('Home')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        flexDirection: 'row',
        color: '#FFF',
        justifyContent: 'flex-end',
      })}
    >
      <Image
        source={require('../../assets/icons/chevron_backbutton.png')}
        style={{
          width: 12,
          height: 21,
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
        }}
      />
    </Pressable>

    <Pressable
      onPress={() => navigation.navigate('Profile')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        flexDirection: 'row',
        color: '#FFF',
        justifyContent: 'flex-end',
      })}
    >
      <HeaderBalance navigation={navigation} children={''} />
    </Pressable>
  </View>
)

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: 26,
    fontWeight: 'bold',
    width: '100%',
    paddingTop: 12,
    paddingLeft: 17,
    paddingRight: 11,
    paddingBottom: 14,
    height: 88,
    backgroundColor: 'rgba(0,0,0,1)',
    marginTop: StatusBar.currentHeight,
  },
})

export default memo(Header)
