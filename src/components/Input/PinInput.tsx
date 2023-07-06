import { memo, useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import usePinInputReducer from '../../hooks/usePinInputReducer'

const PinInput = ({ onChange }) => {
  const { state, dispatch } = usePinInputReducer()
  const { pinNumbers, focusedIndex, isSecureEntry } = state
  const refs = useRef<(TextInput | null)[]>([])

  useEffect(() => {
    if (refs.current[focusedIndex]) {
      refs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handlePinInput = (index: number, text: string) => {
    if (!/^\d$/.test(text) && text !== '') {
      return // Only allow a single digit (0-9) or empty string for deletion
    }

    const newPin = [...pinNumbers]
    newPin[index] = text

    // Call the onChange prop with the new pin
    onChange(newPin)

    dispatch({ type: 'SET_PIN_NUMBER', pinNumbers: newPin })

    if (text !== '') {
      index < 3
        ? dispatch({
            type: 'SET_FOCUSED_INDEX',
            focusedIndex: index + 1,
          })
        : null
    } else {
      index > 0
        ? dispatch({
            type: 'SET_FOCUSED_INDEX',
            focusedIndex: index - 1,
          })
        : null
    }
  }

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && pinNumbers[index] === '') {
      index >= 0
        ? dispatch({
            type: 'SET_FOCUSED_INDEX',
            focusedIndex: index - 1,
          })
        : null
    }
  }

  const toggleSecureEntry = () => {
    dispatch({
      type: 'SET_IS_SECURE_ENTRY',
      isSecureEntry: !isSecureEntry,
    })
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.pinContainer}>
        {pinNumbers.map((pinNumber, index) => (
          <View
            key={index}
            style={[
              styles.pinInputBox,
              index !== pinNumbers.length - 1 && styles.marginRight,
            ]}
          >
            <View style={styles.styledContainer}>
              <TextInput
                accessibilityLabel={`Pin Input ${index + 1}`}
                keyboardType="numeric"
                returnKeyType={'done'}
                ref={(input) => (refs.current[index] = input)}
                style={styles.input}
                placeholder={''}
                value={pinNumber}
                maxLength={1}
                onChangeText={(text) => handlePinInput(index, text)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(index, nativeEvent.key)
                }
                secureTextEntry={isSecureEntry}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <IconButton
        icon={isSecureEntry ? 'eye' : 'eye-off'}
        iconColor={
          isSecureEntry
            ? 'rgba(112, 79, 247, 0.5)'
            : 'rgba(112, 79, 247, 1)'
        }
        size={24}
        onPress={toggleSecureEntry}
        style={{ alignSelf: 'flex-end' }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  pinContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 117.96,
    marginTop: 77,
    paddingLeft: 14,
    paddingRight: 14,
  },
  pinInputBox: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'transparent',
    width: '20%',
  },
  marginRight: {
    marginRight: 7,
  },
  styledContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 12,
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 48,
    fontWeight: '400',
    color: '#0F0056',
  },
})

export default memo(PinInput)
