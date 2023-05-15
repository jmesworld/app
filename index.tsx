//import 'react-native-url-polyfill/auto'
import 'expo-dev-client'
import 'react-native-url-polyfill/auto'
import { registerRootComponent } from 'expo'
import { Platform, LogBox } from 'react-native'
import { TextEncoder, TextDecoder } from 'text-encoding'
// import { TextEncoder, TextDecoder } from 'util'
import process from 'process'
import App from './App'

if (Platform.OS !== 'web') {
  require('react-native-get-random-values')
  LogBox.ignoreLogs([
    "Warning: The provided value 'ms-stream' is not a valid 'responseType'.",
    "Warning: The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
  ])
}

// if (typeof global.TextEncoder === 'undefined') {
//   global.TextEncoder = TextEncoder
// }

// if (typeof global.TextDecoder === 'undefined') {
//   global.TextDecoder = TextDecoder
// }

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer
}

global.btoa = global.btoa || require('base-64').encode
global.atob = global.atob || require('base-64').decode

global.process = process

//process.env.NODE_ENV = process.env.NODE_ENV || 'development'

registerRootComponent(App)
