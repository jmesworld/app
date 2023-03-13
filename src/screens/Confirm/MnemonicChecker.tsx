import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const MnemonicChecker = () => {
  const [mnemonic, setMnemonic] = useState('')
  const [mnemonicWords, setMnemonicWords] = useState([])
  const [inputWords, setInputWords] = useState([])

  const handleMnemonicChange = (text) => {
    // Split the mnemonic into an array of words
    const words = text.split(' ')
    // Set the mnemonic and the mnemonicWords state
    setMnemonic(text)
    setMnemonicWords(words)
    // Reset the inputWords state to an array of empty strings with the same length as the mnemonicWords array
    setInputWords(new Array(words.length).fill(''))
  }

  const handleInputChange = (text, index) => {
    // Create a copy of the inputWords array
    const newInputWords = [...inputWords]
    // Update the value at the specified index
    newInputWords[index] = text
    // Set the new inputWords state
    setInputWords(newInputWords)
  }

  const handleConfirm = () => {
    // Check if the inputWords array matches the mnemonicWords array
    if (inputWords.join(' ') === mnemonic) {
      // Handle successful confirmation
      alert('Mnemonic is correct!')
    } else {
      // Handle unsuccessful confirmation
      alert('Mnemonic is incorrect.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your mnemonic:</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={3}
        onChangeText={handleMnemonicChange}
        value={mnemonic}
      />
      {mnemonicWords.map((word, index) => (
        <TextInput
          key={index}
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, index)}
          value={inputWords[index]}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default MnemonicChecker
