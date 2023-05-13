import React, { memo } from 'react'

import Button from './Button'
import { Text, View } from '../Themed/Themed'
import { StyleSheet } from 'react-native'

type Props = React.ComponentProps<typeof Button> & {
  enabled: boolean
}

const StyledButton = ({ children, enabled, ...props }: Props) => {
  return (
    <Button
      style={[
        styles.button,
        enabled ? styles.enabled : styles.disabled,
      ]}
      {...props}
    >
      <Text
        style={{
          textTransform: 'none',
          fontStyle: 'normal',
          color: '#FCFCFD',
          fontSize: 16,
          fontWeight: '700',
        }}
      >
        {children}
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 90,
  },
  text: {
    textTransform: 'none',
    fontStyle: 'normal',

    fontSize: 16,
    fontWeight: '700',
  },
  enabled: {
    backgroundColor: '#704FF7',
  },
  disabled: {
    backgroundColor: '#D3D3D3',
  },
})

export default memo(StyledButton)
