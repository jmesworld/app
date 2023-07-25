import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

type Props = {
  direction?: 'row' | 'column'
  justify?:
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'flex-start'
    | 'flex-end'
  align?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: number
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const Flex = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start',
  wrap = 'nowrap',
  gap = 0,
  children,
  style,
}: Props) => (
  <View
    style={[
      {
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap,
      },
      style,
    ]}
  >
    {children}
  </View>
)
