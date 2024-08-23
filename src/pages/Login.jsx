import { useContext } from "react"
import AuthForm from "../components/AuthForm"
import { usernameAndPasswordValidation } from "./validation"
import { AppContext } from "../App"

const Login = () => {
    const { setError } = useContext(AppContext)

    const loginFunc = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        try {
            usernameAndPasswordValidation(username, password)
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <AuthForm submitFunc={loginFunc} btnText="Login" isLogin={true} />
    )
}

export default Login