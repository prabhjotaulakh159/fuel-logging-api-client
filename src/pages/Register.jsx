import AuthForm from "../components/AuthForm"

const Register = () => {
    return (
        <AuthForm submitFunc={null} btnText="Register" isLogin={false} />
    )
}

export default Register