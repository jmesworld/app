import {
  MD3LightTheme as DefaultTheme,
  useTheme,
} from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    black: '#000000',
    red: '#FF5876',
    white: '#FFFFFF',
    green: '#A1F0C4',
    greenText: '#54bd83',
    primary: '#704FF7',
    secondary: '#A1F0C4',
    disabled: 'rgba(0, 0, 0, 0.16)',
  },
}
export type AppTheme = typeof theme

export const useAppTheme = () => useTheme<AppTheme>()
