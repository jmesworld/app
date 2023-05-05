import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native'
import React, { memo, forwardRef } from 'react'
import { Text, View } from '../../components/Themed/Themed'

type Props = TextInputProps & {
  containerStyle?: any
}

const Input = forwardRef<TextInput, Props>((props, ref) => {
  const { containerStyle, ...otherProps } = props

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        ref={ref}
        {...otherProps}
        style={[styles.input, otherProps.style]}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
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
