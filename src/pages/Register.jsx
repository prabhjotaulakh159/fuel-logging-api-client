import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"
import axiosInstance, { useAxiosErrorHandling } from "../axiosConfig"
import { useNavigate } from "react-router-dom"

const Register = () => {
    useAxiosErrorHandling()
    const { setMessage, setError } = useContext(AppContext)
    const navigate = useNavigate()

    const registerFunc = async (e) => {
        e.preventDefault()
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
          await axiosInstance.post('/public/user/register', body)
          setMessage('You have successfully registered')
          setTimeout(() => navigate('/login'), 1000)
        } catch (e) {
          console.error(e);
        } 
    }

    return (
        <AuthForm submitFunc={registerFunc} btnText="Register" isLogin={false} />
    )
}

export default Register