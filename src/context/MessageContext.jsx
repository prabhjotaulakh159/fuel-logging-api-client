import { createContext, useState, useContext } from 'react'

const MessageContext = createContext()

export const useMessageContext = () => {
  return useContext(MessageContext)
}

const MessageContextProvider = ({children}) => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const contextValue = {
    successMessage,
    errorMessage,
    loading,
    setSuccessMessage,
    setErrorMessage,
    setLoading
  }

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  ) 
}

export default MessageContextProvider