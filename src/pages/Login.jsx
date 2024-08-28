import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { useNavigate } from "react-router-dom"
import { axiosInstance, useAxiosErrorHandling } from '../axiosConfig'
import { useMessageContext } from '../context/MessageContext'
import { useAuthContext } from '../context/AuthContext'
import { useEffect } from 'react'


const Login = () => {
    useAxiosErrorHandling()
    
    const { setSuccessMessage,  setErrorMessage } = useMessageContext()
    const { setIsAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
      setSuccessMessage('')
      setErrorMessage('')
    }, [setSuccessMessage, setErrorMessage])

    const loginFunc = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        try {
          usernameAndPasswordValidation(username, password)
        }
        catch (e) {
          setErrorMessage(e.message)
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