import { getStorybookUI, configure } from '@storybook/react-native'
import './storybook/manager'

configure(() => {
  // Import stories here
  require('./stories')
}, module)

const StorybookUIRoot = getStorybookUI({})

export default StorybookUIRoot
