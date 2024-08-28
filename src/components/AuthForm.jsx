import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useMessageContext } from '../context/MessageContext'

const AuthForm = ({submitFunc, btnText, isLogin}) => {
    const { username, setUsername, password, setPassword } = useAuthContext()
    const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } = useMessageContext()

    useEffect(() => {
        setErrorMessage('')
        setSuccessMessage()
    }, [setErrorMessage, setSuccessMessage])

    return (
        <div className="container d-flex justify-content-center align-items-start align-items-md-center min-vh-100 py-3 py-md-5">
            <form onSubmit={submitFunc}  className="__form w-100 p-4 border rounded shadow">
                <h2 className="text-center mb-4">{btnText}</h2>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter username" 
                        value={username}
                        onInput={e => {
                            if (errorMessage) setErrorMessage('')
                            if (successMessage) setSuccessMessage('')
                            setUsername(e.target.value)
                        }}
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Enter password"
                        value={password}
                        onInput={e => {
                            if (errorMessage) setErrorMessage('')
                            if (successMessage) setSuccessMessage('')
                            setPassword(e.target.value)
                        }} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">{btnText}</button>
                <p className='mt-3 text-center text-danger'>{errorMessage}</p>
                <p className='mt-3 text-center text-success'>{successMessage}</p>
                {!isLogin && <p className='mt-3 text-center'>Already have an account ? <Link to='/login'>Login</Link> instead</p>}
            </form>
        </div>
    );
};

export default AuthForm;
