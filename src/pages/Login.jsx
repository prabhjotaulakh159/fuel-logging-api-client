import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import axiosInstance from '../axiosConfig'

const Login = () => {
    const { setError, setMessage, setIsAuthenticated } = useContext(AppContext)
    const navigate = useNavigate();

    const loginFunc = async (e) => {
        e.preventDefault()
        setMessage('')
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            usernameAndPasswordValidation(username, password)
            const body = { username: username, password: password }
            const response = await axiosInstance.post('/public/user/login', body)
            if (response.status !== 200) {
                throw new Error('Something went wrong with login, please try again later')
            }
            const token = response.data.bearerToken
            localStorage.setItem('token', `Bearer ${token}`)
            setIsAuthenticated(true)
            navigate('/sheets') 
        } catch (e) {
            if (e.response && e.response.data) {
                setError(e.response.data.message)
            } else if (e.message) {
                setError(e.message)
            } else {
                setError('Internal server error')
            }
        }
    }

    return (
        <AuthForm submitFunc={loginFunc} btnText="Login" isLogin={true} />
    )
}

export default Login