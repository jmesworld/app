import React, { memo } from 'react'
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'

import { Navigation } from '../../types'
import { useAppTheme } from '../../theme'
import { useStoreState } from '../../hooks/storeHooks'
import JmesIcon from '../../assets/jmes.svg'

type Props = {
  children: string
  navigation: Navigation
  backButton?: boolean
  title?: string
  handleBack?: () => void
}

const Navbar = ({
  handleBack,
  navigation,
  children,
  title,
}: Props) => {
  const balance = useStoreState(
    (state) => state?.accounts?.[0]?.balance
  )
  const onBoardingBalance = useStoreState(
    (state) => state.onBoarding.balance
  )
  const { colors } = useAppTheme()

  return (
    <View style={styles.navbar}>
      <View style={styles.toolbar}>
        <View style={styles.flexRow}>
          <Pressable
            onPress={
              handleBack
                ? handleBack
                : () => navigation.navigate(children)
            }
            style={({ pressed }) => ({
              flexDirection: 'row',
              opacity: pressed ? 0.5 : 1,
              justifyContent: 'flex-start',
              alignSelf: 'center',
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
          <Text style={styles.title}>{title}</Text>
          </Pressable>
        </View>
        <View
          style={[styles.wallet, { backgroundColor: colors.primary }]}
        >
          <JmesIcon
            width={10}
            height={13}
            style={{
              marginTop: 2,
              marginRight: 3,
            }}
          />

          <Text style={styles.walletText}>
            {' '}
            {balance || onBoardingBalance}{' '}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 'auto',
    paddingLeft: 23,
    width: '100%',
    marginBottom: 21,
    height: 23,
  },
  title: {
    marginLeft: 18,
    fontSize: 18,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  walletText: {
    height: 16,
    fontSize: 14,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wallet: {
    borderRadius: 90,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    justifyContent: 'flex-start',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
})

export default memo(Navbar)
