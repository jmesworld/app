import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton, useTheme } from 'react-native-paper'
import { theme } from '../../app/theme'
import { useAppTheme } from '../../theme'

type ButtonProps = {
  rounded?: 'full' | 'md' | 'sm' | 'none'
  width?: 'full' | 'md' | 'sm' | number | string
}

type Props = ButtonProps & React.ComponentProps<typeof PaperButton>

const Button = ({
  mode,
  rounded,
  disabled,
  style,
  width,
  children,
  ...props
}: Props) => {
  const theme = useAppTheme()

  const modeStyle = mode && {
    ...(mode === 'contained' && {
      backgroundColor: disabled
        ? theme.colors.disabled
        : theme.colors.primary,
      color: disabled ? theme.colors.tertiary : theme.colors.white,
    }),
    ...(mode === 'outlined' && {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    }),
  }

  const widthStyle = width && {
    ...(width === 'full' && {
      width: '100%',
    }),
    ...(width === 'md' && {
      width: '50%',
    }),
    ...(width === 'sm' && {
      width: '25%',
    }),
    ...(typeof width === 'number' && {
      width: width,
    }),
    ...(typeof width === 'string' && {
      width: width,
    }),
  }

  const roundedStyle = rounded && {
    ...(rounded === 'full' && {
      borderRadius: 90,
    }),
    ...(rounded === 'md' && {
      borderRadius: 20,
    }),
    ...(rounded === 'sm' && {
      borderRadius: 10,
    }),
    ...(rounded === 'none' && {
      borderRadius: 0,
    }),
  }

  return (
    <PaperButton
      style={[
        styles.button,
        style,
        roundedStyle,
        modeStyle,
        widthStyle,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
      onPress={(e) => {
        if (props.onPress && !disabled) {
          props.onPress(e)
        }
      }}
    >
      {children}
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {
    height: '100%',
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
  },
})

export default memo(Button)
