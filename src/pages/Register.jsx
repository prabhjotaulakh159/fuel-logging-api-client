import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"
import axiosInstance from "../axiosConfig"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const { setError, setMessage } = useContext(AppContext)
    const navigate = useNavigate()

    const registerFunc = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            usernameAndPasswordValidation(username, password)
            const body = { username: username, password: password }
            const response = await axiosInstance.post('/public/user/register', body)
            if (response.status !== 200) {
                throw new Error('Something went wrong with registration, please try again later')
            }
            setMessage('You have successfully registered')
            setTimeout(() => navigate('/login'), 1000) // let the login component mount first with the message
            // thats why we wait 1 second
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
        <AuthForm submitFunc={registerFunc} btnText="Register" isLogin={false} />
    )
}

export default Register