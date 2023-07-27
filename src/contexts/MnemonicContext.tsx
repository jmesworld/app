import React, { createContext, useContext, useState } from 'react'

const emptyFn = () => {
  throw new Error('Mnemonic not initialized')
}

type MnemonicContext = {
  mnemonic: string | null
  setMnemonic: (mnemonic: string | null) => void
}

const initialState: MnemonicContext = {
  mnemonic: null,
  setMnemonic: emptyFn,
}

const MnemonicContext = createContext<MnemonicContext>(initialState)

export const MnemonicProvider = ({ children }) => {
  const [mnemonic, setMnemonic] = useState<string | null>('')

  return (
    <MnemonicContext.Provider value={{ mnemonic, setMnemonic }}>
      {children}
    </MnemonicContext.Provider>
  )
}

export const useMnemonicContext = () => useContext(MnemonicContext)
