//import { getStorybookUI, configure } from '@storybook/react-native'
import { registerRootComponent } from 'expo'
import { Platform, LogBox } from 'react-native'
import process from 'process'
import App from './app/App'

if (Platform.OS !== 'web') {
  require('react-native-get-random-values')
  LogBox.ignoreLogs([
    "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
    "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ])
}

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer
}

global.btoa = global.btoa || require('base-64').encode
global.atob = global.atob || require('base-64').decode

global.process = process

process.version = 'v9.40'

registerRootComponent(App)
