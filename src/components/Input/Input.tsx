import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  Image,
} from 'react-native'
import React, { memo, forwardRef, ReactNode } from 'react'
import { Text, View } from '../../components/Themed/Themed'
import { useAppTheme } from '../../theme'
import { IconButton } from 'react-native-paper'

type Props = TextInputProps & {
  containerStyle?: any
  error?: string | null
  success?: boolean
  imgSource?: ReactNode
}

const Input = forwardRef<TextInput, Props>((props, ref) => {
  const { colors } = useAppTheme()
  const { containerStyle, ...otherProps } = props
  const errorStyle = props.error && {
    borderColor: colors.red,
  }

  return (
    <View style={[styles.container, containerStyle, errorStyle]}>
      <TextInput
        ref={ref}
        {...otherProps}
        style={[styles.input, otherProps.style]}
      />
      {props.imgSource && (
        <View style={styles.imgContainer}>{props.imgSource}</View>
      )}
      {props.success && (
        <IconButton
          icon="check"
          iconColor={colors.greenText}
          size={20}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(112, 79, 247, 0.5)',
    borderRadius: 12,
    flexDirection: 'row',
    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
  },
  imgContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  input: {
    width: '85%',
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
