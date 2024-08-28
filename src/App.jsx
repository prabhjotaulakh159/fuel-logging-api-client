import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Home from './pages/Home'
import Container from './components/Container'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Sheets from './pages/Sheets'
import UpdateSheet from './pages/UpdateSheet'
import ChangePassword from './pages/ChangePassword'

const App = () => {
    const { isAuthenticated } = useAuthContext()

    return (
        <Container>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={isAuthenticated ? <Navigate to='/sheets'/> : <Register/>}/>
                <Route path='/login' element={isAuthenticated ? <Navigate to='/sheets'/> : <Login/>} />
                <Route path='/sheets' element={isAuthenticated ? <Sheets/> : <Navigate to='/login'/>}/>
                <Route path='/update-sheet/:id' element={isAuthenticated ? <UpdateSheet/> : <Navigate to='/login'/>}/>
                <Route path='/change-password' element={isAuthenticated ? <ChangePassword/> : <Navigate to='/login'/>}/>
            </Routes>
        </Container>
    )
}

export default App
