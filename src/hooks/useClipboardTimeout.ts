import { useState } from 'react'
import Clipboard from '@react-native-clipboard/clipboard'

export function useClipboardTimeout(): [
  boolean,
  (value: string, timeout?: number) => void
] {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (value: string, timeout = 2000) => {
    try {
       Clipboard.setString(value)

      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, timeout)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      setCopied(false)
    }
  }

  return [copied, copyToClipboard]
}
