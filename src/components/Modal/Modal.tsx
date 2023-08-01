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
const windowHeight = Dimensions.get('window').height

const initialLgHeight = windowHeight / 1.5
const initialLgWidth = windowWidth / 1.5

const initialMdHeight = windowHeight / 2
const initialMdWidth = windowWidth / 2

const initialSmHeight = windowHeight / 2.5
const initialSmWidth = windowWidth / 2.5

type Props = {
  isVisible: boolean
  onRequestClose: () => void
  children: React.ReactNode
  height?: 'lg' | 'md' | 'sm'
}

const getHeights = (height: 'lg' | 'md' | 'sm') => {
  switch (height) {
    case 'lg':
      return {
        initialHeight: initialLgHeight,
        initialWidth: initialLgWidth,
      }
    case 'md':
      return {
        initialHeight: initialMdHeight,
        initialWidth: initialMdWidth,
      }
    case 'sm':
      return {
        initialHeight: initialSmHeight,
        initialWidth: initialSmWidth,
      }
    default:
      return {
        initialHeight: initialLgHeight,
        initialWidth: initialLgWidth,
      }
  }
}

const CustomModal = ({
  isVisible,
  onRequestClose,
  children,
  height = 'md',
}: Props) => {
  const modalHeight = useRef(
    new Animated.Value(getHeights(height).initialHeight)
  ).current

  const resetHeight = () => modalHeight.setValue(getHeights(height).initialHeight)

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
        modalHeight.setValue(newHeight)
      },
      onPanResponderRelease: (_, { vx, vy }) => {
        const speed = Math.sqrt(vx ** 2 + vy ** 2)
        if (speed > 0.2) {
          onRequestClose()
          resetHeight()
        } else {
          Animated.spring(modalHeight, {
            toValue: getHeights(height).initialHeight,
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
          style={[styles.modal, { height: modalHeight }]}
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
