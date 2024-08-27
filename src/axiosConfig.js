import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const useAxiosErrorHandling = () => {
  const { setIsAuthenticated, setError } = useContext(AppContext);
  const nav = useNavigate();
  axiosInstance.interceptors.response.use(
    response => response, 
    error => {
      if (error.response.status === 403) {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
        nav('/login')
        alert('hello world')
      } else if (error.response.status === 401) {
        nav("/sheets")
      } else if (error.response.status === 400) {
        setError(error.response.data.message)
      } else if (error.response.data) {
        setError(error.response.data.message)
      } else if (error.message) {
        setError(error.message)
      } else {
        setError('Internal server error')
      }
      return Promise.reject(error)
    }
  )
}

export default axiosInstance
