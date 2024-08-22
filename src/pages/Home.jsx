import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-4">Welcome to My Fuel Logging App</h1>
            <p className="lead mt-3">Track and manage your fuel consumption easily.</p>
            <div className="d-flex justify-content-center mt-4">
                <ul className="text-start">
                    <li>Track and manage fuel consumption</li>
                    <li>Organize logs into folders</li>
                    <li>Log fuel time, amount, cost, time, and location</li>
                </ul>
            </div>
            <a href="https://github.com/prabhjotaulakh159/fuel-logging-api-client" className="btn btn-primary mt-4">Visit My GitHub</a>
            <Link to='/' className='btn btn-primary mt-4 ms-3'>Try it out :)</Link>
        </div>
    )
}

export default Home