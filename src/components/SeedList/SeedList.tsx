import { memo, useCallback, useRef } from 'react'
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { View } from '../../components/Themed/Themed'
import Input from '../Input/Input'

const SeedList = ({
  mnemonicWords,
  setMnemonicWords,
}: {
  mnemonicWords: string[]
  setMnemonicWords: (words: string[]) => void
}) => {
  const inputRefs = useRef([])
  const focusOnNextInput = (index: number) => {
    if (index < mnemonicWords.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleTextChange = useCallback(
    (text, index) => {
      const newMnemonicWords = [...mnemonicWords]
      newMnemonicWords[index] = text
      setMnemonicWords(newMnemonicWords)

      if (text.includes(' ')) {
        focusOnNextInput(index)
      }
    },
    [mnemonicWords, setMnemonicWords]
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.mnemonicContainer}>
        {mnemonicWords.map((word, index) => (
          <View key={index} style={styles.seedContentContainer}>
            <Input
              ref={(instance) => {
                inputRefs.current[index] = instance
              }}
              autoFocus={index === mnemonicWords.length - 12}
              placeholder=""
              value={word}
              onChangeText={(text) => handleTextChange(text, index)}
            />
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mnemonicContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    height: 352,
    marginTop: 44,
    marginBottom: 52,
    paddingLeft: 9,
    paddingRight: 9,
    rowGap: 30,
    columnGap: 7,
  },
  seedContentContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'transparent',
    height: 48,
    minWidth: 108,
    width: '30%',
  },
})

export default memo(SeedList)
