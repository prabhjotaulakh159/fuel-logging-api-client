import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({children}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState('')

  const logout = () => {
    setUsername('')
    setPassword('')
    setNewPassword('')
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
    setNewPassword,
    setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContextProvider