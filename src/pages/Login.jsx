import AuthForm from '../components/AuthForm'

const Login = () => {
    return (
        <AuthForm submitFunc={null} btnText="Login" isLogin={true} />
    )
}

export default Login