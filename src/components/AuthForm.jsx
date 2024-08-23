import './AuthForm.css'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';

const AuthForm = ({submitFunc, btnText, isLogin}) => {
    const { username, setUsername, password, setPassword } = useContext(AppContext)

    return (
        <div className="container d-flex justify-content-center align-items-start align-items-md-center min-vh-100 py-3 py-md-5">
            <form className="__form w-100 p-4 border rounded shadow">
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
                        onInput={e => setPassword(e.target.password)} 
                        required 
                    />
                </div>
                <button onSubmit={submitFunc} type="submit" className="btn btn-primary w-100">{btnText}</button>
                { !isLogin && <p className='mt-3 text-center'>Already have an account ? <Link to='/login'>Login</Link> instead</p>}
            </form>
        </div>
    );
};

export default AuthForm;
