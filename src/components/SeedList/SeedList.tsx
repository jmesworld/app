import { memo, useCallback, useRef } from 'react'
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { View, Text } from '../../components/Themed/Themed'
import Input from '../Input/Input'
import {
  capitalNameSchema,
  nameSchemaForEachChar,
} from '../../validations/name'

const SeedList = ({
  mnemonicWords,
  setMnemonicWords,
  errors,
  readonly = false,
}: {
  mnemonicWords: string[]
  readonly?: boolean
  setMnemonicWords?: (word: string, index) => void
  errors?: number[]
}) => {
  const inputRefs = useRef([])
  const focusOnNextInput = (index: number) => {
    if (index < mnemonicWords.length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleTextChange = useCallback(
    (text, index) => {
      setMnemonicWords(text, index)

      if (text.includes(' ')) {
        focusOnNextInput(index)
      }
    },
    [mnemonicWords, setMnemonicWords]
  )

  return (
    <KeyboardAvoidingView
      style={{
        height: 352,
      }}
      enabled={!readonly}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.mnemonicContainer}>
        {mnemonicWords.map((word, index) => (
          <View key={index} style={styles.seedContentContainer}>
            <Input
              editable={!readonly}
              style={{ textAlign: 'center' }}
              ref={(instance) => {
                inputRefs.current[index] = instance
              }}
              showErrorBg={!readonly}
              error={
                !readonly && errors?.includes(index)
                  ? 'Invalid word'
                  : null
              }
              autoFocus={index === mnemonicWords.length - 12}
              placeholder=""
              value={word}
              onChangeText={(text) => {
                if (readonly) return
                let value = text
                if (capitalNameSchema.safeParse(text).success) {
                  value = text.toLowerCase()
                }
                
                if (
                  !nameSchemaForEachChar.safeParse(value).success &&
                  value !== ''
                ) {
                  return
                }
                handleTextChange(value, index)
              }}
            />
            <Text style={styles.seedWordNumber}> {index + 1} </Text>
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
    marginBottom: 22,
    paddingLeft: 9,
    paddingRight: 9,
    rowGap: 30,
    columnGap: 7,
  },
  seedWordNumber: {
    marginTop: 5,
    color: '#704FF7',
    alignSelf: 'center',
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
