import { memo, useState } from 'react'
import { View, Text } from '../Themed/Themed'
import { Pressable, StyleSheet } from 'react-native'
import { Navigation } from '../../types'
import LogoutModal from '../Logout/LogoutModal'
import { useRoute } from '@react-navigation/native'
import { useAppTheme } from '../../theme'
import WalletIcon from '../../assets/wallet.svg'
import WalletPurpleIcon from '../../assets/WalletPurple.svg'
import ScanIcon from '../../assets/scan.svg'
import LogoutIcon from '../../assets/logout.svg'

interface Props {
  children?: React.ReactNode
  navigation: Navigation
}

const BottomNav = ({ children, navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const route = useRoute()
  const { colors } = useAppTheme()

  const activeStyle = {
    backgroundColor: colors.secondary,
    borderRadius: 52,
    height: 52,
    width: 52,
  }

  const isRootActive = route.name === 'Root'
  // TODO: change wallet icon to purple when active
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Scan')
        }}
        style={[styles.button, route.name === 'Scan' && activeStyle]}
      >
        <ScanIcon
          width={24}
          height={24}
          style={{
            alignSelf: 'center',
          }}
        />
        <Text style={styles.buttonText}>Scan</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Root')
        }}
        style={[styles.button, isRootActive && activeStyle]}
      >
        {isRootActive && (
          <WalletPurpleIcon
            width={24}
            height={24}
            style={{
              alignSelf: 'center',
            }}
          />
        )}

        {!isRootActive && (
          <WalletIcon
            color={isRootActive ? colors.primary : 'white'}
            width={24}
            height={24}
            style={{
              alignSelf: 'center',
            }}
          />
        )}
        {!isRootActive && (
          <Text style={styles.buttonText}>Wallet</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
        style={styles.button}
      >
        <LogoutIcon
          height={24}
          width={24}
          color={colors.white}
          style={{
            alignSelf: 'center',
          }}
        />
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      <LogoutModal
        isVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#704FF7',
    flexDirection: 'row',
    borderRadius: 64,
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    width: '92%',
    height: 70,
    marginBottom: 14,
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 29,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

    marginTop: 'auto',
    marginBottom: 20,
    width: 100,
    height: 50,
    backgroundColor: 'transparent',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(112, 79, 247, 0.9)',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 10,
    marginTop: 5,
  },
})

export default memo(BottomNav)
