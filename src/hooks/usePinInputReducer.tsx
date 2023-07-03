import { useReducer } from 'react'

const initialState = {
  pinNumbers: Array(4).fill(''),
  focusedIndex: 0,
  isSecureEntry: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PIN_NUMBER':
      return { ...state, pinNumbers: action.pinNumbers }
    case 'SET_FOCUSED_INDEX':
      return { ...state, focusedIndex: action.focusedIndex }
    case 'SET_IS_SECURE_ENTRY':
      return { ...state, isSecureEntry: action.isSecureEntry }
    default:
      throw new Error()
  }
}

const usePinInputReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

export default usePinInputReducer
