import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import axiosInstance, { useAxiosErrorHandling } from '../axiosConfig'

const Login = () => {
    useAxiosErrorHandling()
    const { setMessage, setIsAuthenticated, setError } = useContext(AppContext)
    const navigate = useNavigate();

    const loginFunc = async (e) => {
        e.preventDefault()
        setMessage('')
        const username = e.target.username.value
        const password = e.target.password.value
        try {
          usernameAndPasswordValidation(username, password)
        }
        catch (e) {
          setError(e.message)
          return;
        }
        const body = { username: username, password: password }
        try {
          const response = await axiosInstance.post('/public/user/login', body)
          const token = response.data.bearerToken
          localStorage.setItem('token', `Bearer ${token}`)
          setIsAuthenticated(true)
          navigate('/sheets') 
        } catch (e) {
          console.error(e);
        }
    }

    return (
        <AuthForm submitFunc={loginFunc} btnText="Login" isLogin={true} />
    )
}

export default Login