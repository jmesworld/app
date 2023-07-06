import { useContext } from 'react'
import { View, Text, Image } from 'react-native'
import CustomModal from '../Modal/Modal'
import StyledButton from '../Button/StyledButton'
import { AuthContext } from '../../app/AuthProvider'
import { useStoreActions } from '../../hooks/storeHooks'
import { Navigation } from '../../types'
import styles from './LogoutModal.styles'

interface Props {
  isVisible: boolean
  onRequestClose: () => void
  navigation: Navigation
}

const LogoutModal = ({
  isVisible,
  onRequestClose,
  navigation,
}: Props) => {
  const auth = useContext(AuthContext)

  const resetStore = useStoreActions((actions) => actions.resetStore)

  const handleLogout = async () => {
    await resetStore(true)
    return navigation.navigate('Onboarding')
  }

  return (
    <CustomModal
      isVisible={isVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/icons/logout.png')}
        />
        <Text style={styles.text}>
          Are you sure you want to logout?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <StyledButton onPress={handleLogout} enabled={true}>
          Confirm
        </StyledButton>
      </View>
    </CustomModal>
  )
}

export default LogoutModal
