import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"
import axios from "axios"

const Register = () => {
    const { setError } = useContext(AppContext)

    const registerFunc = async (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            usernameAndPasswordValidation(username, password)
            const body = { username: username, password: password }
            const response = await axios.post(process.env.REACT_APP_API_URL + '/public/user/register', body)
            console.log(response)
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