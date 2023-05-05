// customHooks.ts

import { useState, useEffect } from 'react'

export const useLockout = (initialAttempts: number) => {
  const [attempts, setAttempts] = useState(initialAttempts)
  const [isLocked, setIsLocked] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1000)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsLocked(false)
      setAttempts(0)
    }
  }, [remainingTime, setIsLocked])

  return {
    attempts,
    isLocked,
    remainingTime,
    errorText,
    setAttempts,
    setIsLocked,
    setRemainingTime,
    setErrorText,
  }
}
