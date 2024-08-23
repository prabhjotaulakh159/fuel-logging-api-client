import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Container from './components/Container'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { createContext, useState } from 'react'


const AppContext = createContext('context')

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const contextValue = {
        username: username,
        setUsername: setUsername,
        password: password,
        setPassword: setPassword
    }

    return (
        <AppContext.Provider value={contextValue}>
            <Container>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/login' element={<Login/>} />
                </Routes>
            </Container>
        </AppContext.Provider>
    )
}

export default App
