type LockoutProps = {
  attempts: number
  setAttempts: (attempts: number) => void
  setIsLocked: (isLocked: boolean) => void
  setRemainingTime: (remainingTime: number) => void
  setErrorText: (errorText: string) => void
}

export const handleLockout = ({
  attempts,
  setAttempts,
  setIsLocked,
  setRemainingTime,
  setErrorText,
}: LockoutProps) => {
  const LOCKOUT_DURATION = 1 * 30 * 1000 // 30 seconds in milliseconds
  setErrorText('Too many failed attempts. Please try again later.')
  setIsLocked(true)
  setTimeout(() => {
    setIsLocked(false)
    setAttempts(0)
    setErrorText('')
    setRemainingTime(LOCKOUT_DURATION)
  }, LOCKOUT_DURATION)
}
