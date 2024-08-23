import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const { setError, setMessage } = useContext(AppContext)
    const navigate = useNavigate();

    const loginFunc = async (e) => {
        e.preventDefault()
        setMessage('')
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            usernameAndPasswordValidation(username, password)
            const body = { username: username, password: password }
            const response = await axios.post(process.env.REACT_APP_API_URL + '/public/user/login', body)
            if (response.status !== 200) {
                throw new Error('Something went wrong with login, please try again later')
            }
            const token = response.data.bearerToken
            localStorage.setItem('token', `Bearer ${token}`)
            navigate('/') // let the login component mount first with the message
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
        <AuthForm submitFunc={loginFunc} btnText="Login" isLogin={true} />
    )
}

export default Login