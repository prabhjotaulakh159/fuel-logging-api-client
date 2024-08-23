import './AuthForm.css'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext, useEffect } from 'react';

const AuthForm = ({submitFunc, btnText, isLogin}) => {
    const { username, setUsername, password, setPassword, error, setError } = useContext(AppContext)

    // reset the error on page refresh or change to login/register
    useEffect(() => {
        setError('')
    }, [setError])

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
                        onInput={e => setUsername(e.target.value)}
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
                        onInput={e => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">{btnText}</button>
                { !isLogin && <p className='mt-3 text-center'>Already have an account ? <Link to='/login'>Login</Link> instead</p>}
                { error && <p className='mt-3 text-center text-danger'>{error}</p>}
            </form>
        </div>
    );
};

export default AuthForm;
