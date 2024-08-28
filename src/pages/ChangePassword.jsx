import { useEffect } from 'react'
import { axiosInstance, useAxiosErrorHandling } from '../axiosConfig'
import { usernameAndPasswordValidation } from './validation'
import { useAuthContext } from '../context/AuthContext'
import { useMessageContext } from '../context/MessageContext'


const ChangePassword = () => {
  useAxiosErrorHandling()

  const { username, setUsername, password, setPassword, updatedPassword, setUpdatedPassword } = useAuthContext()
  const { errorMessage, setErrorMessage } = useMessageContext()

  useEffect(() => {
    setUsername('')
    setPassword('')
    setUpdatedPassword('')
    setErrorMessage('')
  }, [setPassword, setUsername, setUpdatedPassword, setErrorMessage])
  
  const changePassword = async () => {
    try {
      usernameAndPasswordValidation(username, password, updatedPassword)
    } catch (e) {
      setErrorMessage(e.message)
    }
    try {
      const body = {
        username: username,
        password: password,
        newPassword: updatedPassword
      }
      axiosInstance.post('/private/user/update-password', body, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-start align-items-md-center min-vh-100 py-3 py-md-5">
            <form onSubmit={changePassword}  className="__form w-100 p-4 border rounded shadow">
                <h2 className="text-center mb-4">Change Password</h2>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter username" 
                        value={username}
                        onInput={e => {
                          setErrorMessage('')
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
                          setErrorMessage('')
                          setPassword(e.target.value)
                        }} 
                        required 
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="new-password">New password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="new-password" 
                        placeholder="Enter new password"
                        value={updatedPassword}
                        onInput={e => {
                          setErrorMessage('')
                          setUpdatedPassword(e.target.value)
                        }} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Change</button>
                <p className='mt-3 text-center text-danger'>{errorMessage}</p>
            </form>
        </div>
  )
}

export default ChangePassword