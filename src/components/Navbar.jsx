import './Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
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
                </ul>
            </div>
            <div className='d-block d-md-none'>
                <i className='__menu bi bi-list'></i>
            </div>
        </nav>
    )
}

export default Navbar