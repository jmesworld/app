import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

type Props = {
  closeModal: () => void
}

const LogoutModal = ({ closeModal }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            width: 51.67,
            height: 51.67,
            alignSelf: 'center',
          }}
          source={require('../../../assets/icons/logout.png')}
        />
        <Text style={styles.text}>
          Are you sure you want to logout?
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 82,
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    alignSelf: 'center',
    marginTop: 29,
    marginBottom: 20,
  },
})
export default LogoutModal
