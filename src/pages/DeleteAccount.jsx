import AuthForm from '../components/AuthForm'
import { usernameAndPasswordValidation } from './validation'
import { useAuthContext } from '../context/AuthContext'
import { useMessageContext } from '../context/MessageContext'
import { useAxiosErrorHandling, axiosInstance } from '../axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const DeleteAccount = () => {
  useAxiosErrorHandling()

  const { username, password, logout, setUsername, setPassword } = useAuthContext()
  const { setErrorMessage } = useMessageContext()
  const navigate = useNavigate()

  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [setUsername, setPassword])

  const deleteAccount = async (e) => {
    e.preventDefault();
    try {
      usernameAndPasswordValidation(username, password, null);
    } catch (e) {
      setErrorMessage(e.message)
      return
    }
    try {
      await axiosInstance.delete('/private/user/delete', {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        data: {
          username: username,
          password: password,
        },
      })
      logout()
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthForm submitFunc={deleteAccount} btnText='Delete account' isLogin={true}/>
  )
}

export default DeleteAccount