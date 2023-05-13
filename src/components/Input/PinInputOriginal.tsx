import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import { View } from '../../components/Themed/Themed'

interface Props {
  pinNumbers: string[]
  setPinNumbers: (pinNumbers: string[]) => void
  placeholder?: string
  secureTextEntry?: boolean
}

const PinInput = ({
  pinNumbers,
  setPinNumbers,
  placeholder,
  secureTextEntry,
}: Props) => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const refs = useRef<Array<TextInput>>([
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ])

  useEffect(() => {
    refs.current[focusedIndex]?.focus()
  }, [focusedIndex])

  const handlePinInput = useCallback(
    (index: number, text: string) => {
      const newPin = [...pinNumbers]
      newPin[index] = text
      setPinNumbers(newPin)

      if (text !== '') {
        index < 3 ? setFocusedIndex(index + 1) : null
      } else {
        index > 0 ? setFocusedIndex(index - 1) : null
      }
    },
    [pinNumbers, setPinNumbers]
  )

  return (
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
              keyboardType="numeric"
              returnKeyType={'done'}
              ref={(el) => (refs.current[index] = el)}
              style={styles.input}
              placeholder={placeholder}
              value={pinNumber}
              maxLength={1}
              onChangeText={(text) => handlePinInput(index, text)}
              secureTextEntry={secureTextEntry}
            />
          </View>
        </View>
      ))}
    </ScrollView>
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
    marginBottom: 127,
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
