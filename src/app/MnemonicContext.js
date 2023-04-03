import React, { createContext, useContext, useState } from 'react'

const MnemonicContext = createContext()

export const useMnemonic = () => {
  return useContext(MnemonicContext)
}

export const MnemonicProvider = ({ children }) => {
  const [mnemonic, setMnemonic] = useState('')

  return (
    <MnemonicContext.Provider value={{ mnemonic, setMnemonic }}>
      {children}
    </MnemonicContext.Provider>
  )
}
