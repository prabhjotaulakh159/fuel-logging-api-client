import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Container from './components/Container'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { createContext, useState } from 'react'
import Sheets from './pages/Sheets'

export const AppContext = createContext('context')

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sheets, setSheets] = useState([])

    const contextValue = {
        username: username,
        setUsername: setUsername,
        password: password,
        setPassword: setPassword,
        error: error,
        setError: setError,
        message: message,
        setMessage: setMessage,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        loading: loading,
        setLoading: setLoading,
        sheets: sheets,
        setSheets: setSheets
    }

    return (
        <AppContext.Provider value={contextValue}>
            <Container>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/register' element={isAuthenticated ? <Navigate to='/sheets'/> : <Register/>} />
                    <Route path='/login' element={isAuthenticated ? <Navigate to='/sheets'/> : <Login/>} />
                    <Route path='/sheets' element={
                      isAuthenticated ? <Sheets/> : <Navigate to='/login'/>
                    }/>
                </Routes>
            </Container>
        </AppContext.Provider>
    )
}

export default App
