import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Container from './components/Container'
import Navbar from './components/Navbar'

const App = () => {
    return (
        <Container>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        </Container>
    )
}

export default App
