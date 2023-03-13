import { Platform, StyleSheet, TextInput } from 'react-native'
import React, { memo } from 'react'
import { Text, View } from '../../components/Themed/Themed'
const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}) => {
  return (
    <View style={styles.styledContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  styledContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 14,
    fontWeight: '400',
    color: '#0F0056',
  },
})

export default memo(Input)
