import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Checkbox = () => {
  const [checked, setChecked] = useState(false)

  return (
    <TouchableOpacity
      onPress={() => setChecked(!checked)}
      style={styles.uncheckedCheckbox}
    >
      {checked && (
        <Ionicons
          name="ios-checkmark"
          size={32}
          color="rgba(112, 79, 247, 0.5)"
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  uncheckedCheckbox: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(112, 79, 247, 0.1)',
    border: '1px solid rgba(112, 79, 247, 0.5)',
    borderRadius: 4,
  },
  checkedCheckbox: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(112, 79, 247, 0.5)',
  },
})

export default Checkbox
