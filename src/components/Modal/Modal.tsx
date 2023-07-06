import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Modal,
  Animated,
} from 'react-native'

const windowWidth = Dimensions.get('window').width

const CustomModal = ({ isVisible, onRequestClose, children }) => {
  const windowHeight = Dimensions.get('window').height
  const height = useRef(new Animated.Value(windowHeight / 2)).current

  const resetHeight = () => height.setValue(windowHeight / 2)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart() {
        resetHeight()
      },
      onPanResponderMove: (_, { moveY }) => {
        const newHeight = windowHeight - moveY
        if (newHeight <= windowHeight / 8) {
          onRequestClose()
          resetHeight()
          return
        }
        height.setValue(newHeight)
      },
      onPanResponderRelease: (_, { vx, vy }) => {
        const speed = Math.sqrt(vx ** 2 + vy ** 2)
        if (speed > 0.2) {
          onRequestClose()
          resetHeight()
        } else {
          Animated.spring(height, {
            toValue: windowHeight / 2,
            useNativeDriver: false,
          }).start()
        }
      },
    })
  ).current

  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => {
        onRequestClose()
        resetHeight()
      }}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={onRequestClose}
          />
        </View>
        <Animated.View
          style={[styles.modal, { height }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.resizeBar} />
          {children}
        </Animated.View>
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
    height: Dimensions.get('window').height,
  },
  modal: {
    alignSelf: 'center',
    width: windowWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow: '0px 5px 15px rgba(0,0,0,0.3)',
    position: 'absolute',
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
