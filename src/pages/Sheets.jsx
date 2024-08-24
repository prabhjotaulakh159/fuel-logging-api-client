import { useEffect, useContext } from 'react'
import { AppContext } from '../App'
import axios from 'axios'

const Sheets = () => {
  const { loading, setLoading } = useContext(AppContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(process.env.REACT_APP_API_URL + '/private/sheet/all', {
      headers: {
        'Authorization': token
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.error(error))
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>sheets</div>
  )
}

export default Sheets