import { memo, useState, useContext } from 'react'
import { View, Text } from '../Themed/Themed'
import { Platform, Pressable, StyleSheet, Image } from 'react-native'
import { Navigation } from '../../types'
import CustomModal from '../Modal/Modal'
import LogoutModal from '../Modal/LogoutModal'
import StyledButton from '../Button/StyledButton'
import { useStoreActions } from '../../hooks/storeHooks'
import { AuthContext } from '../../app/AuthProvider'

interface Props {
  children?: React.ReactNode
  navigation: Navigation
}

const BottomNav = ({ children, navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const resetStore = useStoreActions((actions) => actions.resetStore)

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  const auth = useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
    resetStore(true)
    navigation.navigate('Root')
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Root')
        }}
        style={styles.button}
      >
        <Image
          source={require('../../../assets/icons/wallet.png')}
          style={{
            width: 19,
            height: 18.67,
            alignSelf: 'center',
          }}
        />
        <Text style={styles.buttonText}>Wallet</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('Scan')
        }}
        style={styles.button}
      >
        <Image
          source={require('../../../assets/icons/scan.png')}
          style={{
            width: 52,
            height: 52,
            alignSelf: 'center',
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
        style={styles.button}
      >
        <Image
          source={require('../../../assets/icons/settings.png')}
          style={{
            width: 18,
            height: 19,
            alignSelf: 'center',
          }}
        />
        <Text style={styles.buttonText}>Settings</Text>
      </Pressable>
      <CustomModal
        isVisible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <LogoutModal closeModal={handleCloseModal} />

        <View style={styles.buttonContainer}>
          <StyledButton onPress={handleLogout} enabled={true}>
            Confirm
          </StyledButton>
        </View>
      </CustomModal>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',

    marginTop: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 48,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'rgba(112, 79, 247, 0.9)',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 10,
  },
})

export default memo(BottomNav)
