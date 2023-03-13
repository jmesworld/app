type ValidatePinProps = {
  pin: string[]
  pinNumbers: string[]
  setAttempts?: (attempts: number) => void
  setIsLocked?: (isLocked: boolean) => void
  setRemainingTime?: (remainingTime: number) => void
  attempts?: number
}

export const validatePin = ({
  pin,
  pinNumbers,
  setAttempts,
  setIsLocked,
  setRemainingTime,
  attempts,
}: ValidatePinProps) => {
  const isCorrect = pin.join('') === pinNumbers.join('')
  if (!isCorrect) {
    setAttempts(attempts + 1)
    if (attempts + 1 === 3) {
      setIsLocked(true)
      setRemainingTime(30 * 1000)
    }
  }
  return isCorrect
}
