import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({children}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setUpdatedPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState('')

  const logout = () => {
    setUsername('')
    setPassword('')
    setUpdatedPassword('')
    setIsAuthenticated('')
    localStorage.clear()
  }

  const contextValue = {
    logout,
    username,
    password,
    newPassword,
    isAuthenticated, 
    setUsername,
    setPassword,
    setUpdatedPassword,
    setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContextProvider