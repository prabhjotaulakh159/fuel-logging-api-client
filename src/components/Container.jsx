import './Container.css'

const Container = ({children}) => {
    return (
        <main className='container-fluid px-3 px-md-5 px-lg-10'>
            <div className='__container'>{children}</div>
        </main>
    )
}

export default Container