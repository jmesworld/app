import React, { memo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { View } from '../../components/Themed/Themed'
import Input from '../Input/Input'

const SeedList = ({
  mnemonicWords,
  setMnemonicWords,
}: {
  mnemonicWords: string[]
  setMnemonicWords: (words: string[]) => void
}) => {
  return (
    <ScrollView contentContainerStyle={styles.mnemonicContainer}>
      {mnemonicWords.map((word, index) => (
        <View key={index} style={styles.seedContentContainer}>
          <Input
            placeholder=""
            value={word}
            onChangeText={(text) => {
              const newMnemonicWords = [...mnemonicWords]
              newMnemonicWords[index] = text
              setMnemonicWords(newMnemonicWords)
            }}
          />
        </View>
      ))}
    </ScrollView>
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
