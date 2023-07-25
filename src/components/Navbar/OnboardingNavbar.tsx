import React, { memo } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import { Navigation } from '../../types'
import Button from '../Button/Button'
import { IconButton } from 'react-native-paper'
import { useAppTheme } from '../../theme'
type Props = {
  children: string
  navigation: Navigation
  backButton?: boolean
  title?: string
}

const Navbar = ({ navigation, children, title }: Props) => {
  const { colors } = useAppTheme()
  return (
    <View style={styles.navbar}>
      <View style={styles.backButtonContainer}>
        <Pressable
          onPress={() => navigation.navigate(children)}
          style={({ pressed }) => ({
            margin: 0,
            opacity: pressed ? 0.5 : 1,
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
          })}
        >
          <IconButton
            style={{
              margin: 0,
            }}
            borderless
            iconColor={colors.primary}
            size={32}
            icon="chevron-left"
          />
          {/* <Image
          source={require('../../../assets/icons/lilac-backarrow.png')}
          style={{
            width: 32,
            height: 32,
          }}
        /> */}
        </Pressable>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={{ alignSelf: 'center', width: 90, height: 25 }}
          source={require('../../../assets/images/jmes-text.png')}
        />
      </View>
      <View style={styles.emptyContainer}></View>
    </View>
  )
}

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
