import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { logout, isAuthenticated } = useAuthContext()
    const navigate = useNavigate()

    const logoutAndNavigateBackToHome = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3 d-flex justify-content-between'>
            <Link to='/' className='navbar-brand'>Fuel Logging</Link>
            <div className='d-none d-lg-flex'>
                <ul className='navbar-nav'>
                    <li className='nav-item active'>
                        <Link to='/register' className='nav-link'>Register</Link>
                    </li>
                    <li className='nav-item active'>
                        <Link to='/login' className='nav-link'>Login</Link>
                    </li>
                    <li className='nav-item active'>
                        <a href='https://github.com/prabhjotaulakh159/fuel-logging-api-client' className='nav-link'>GitHub</a>
                    </li>
                    {isAuthenticated && <li className='nav-item active'><span onClick = {logoutAndNavigateBackToHome} className='nav-link'>Logout</span></li>}
                    {isAuthenticated && <li className='nav-item active'><Link to='/change-password' className='nav-link'>Change Password</Link></li>}
                    {isAuthenticated && <li className='nav-item active'><Link to='/delete-account' className='nav-link'>Delete Account</Link></li>}
                </ul>
            </div>
            <div className='d-block d-md-none'>
                <i className='__menu bi bi-list'></i>
            </div>
        </nav>
    )
}

export default Navbar