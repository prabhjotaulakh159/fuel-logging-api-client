import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import { useMessageContext } from './context/MessageContext'

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const useAxiosErrorHandling = () => {
  const { logout } = useAuthContext()
  const { setErrorMessage } = useMessageContext()
  const navigate = useNavigate()

  axiosInstance.interceptors.response.use(
    response => response, 
    error => {
      if (error.response.status === 403) {
        logout()
        navigate('/')
      } else if (error.response.status === 401) {
        navigate("/sheets")
      } else if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else if (error.response.data) {
        setErrorMessage(error.response.data.message)
      } else if (error.message) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Internal server error')
      }
      return Promise.reject(error)
    }
  )
}