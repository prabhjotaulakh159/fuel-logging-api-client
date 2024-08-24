import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.response.use(
  response => response, 
  error => {
    const { setIsAuthenticated } = useContext(AppContext);
    const nav = useNavigate();
    if (error.response && error.response.status === 401) {
      setIsAuthenticated(false)
      localStorage.removeItem('token')
      nav('/login')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
