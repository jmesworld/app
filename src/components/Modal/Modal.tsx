import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  PanResponder,
  Modal,
} from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const CustomModal = ({ isVisible, onRequestClose, children }) => {
  const [height, setHeight] = useState(windowHeight / 2)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newHeight = windowHeight - gestureState.moveY

      setHeight(newHeight)
    },
    onPanResponderRelease: () => {},
  })

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onRequestClose}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={onRequestClose}
          />
        </View>
        <View
          style={[styles.modal, { height }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.resizeBar} />
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: windowWidth,
    height: windowHeight,
  },
  modal: {
    alignSelf: 'center',
    width: windowWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    backgroundColor: 'white',
  },
  resizeBar: {
    width: 38,
    height: 3,
    backgroundColor: '#AEB7BE',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default CustomModal
