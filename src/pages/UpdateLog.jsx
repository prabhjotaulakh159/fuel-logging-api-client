import { useParams } from 'react-router-dom'
import { useLogContext } from '../context/LogContext'
import { useEffect } from 'react'
import { useAxiosErrorHandling, axiosInstance } from '../axiosConfig'
import LogForm from '../components/LogForm'

const UpdateLog = () => {
  useAxiosErrorHandling()

  const { id, sheetId } = useParams()
  const {
    setFuel,
    setCost,
    setTime,
    setCountry,
    setState,
    setPostalCode,
    setDoorNumber,
    setDate,
    cache, setCache
  } = useLogContext()

  useEffect(() => {
    const getLog = async () => {
      if (cache[sheetId]) {
        const log = cache[sheetId][0]
        setFuel(log.fuelAmount)
        setCost(log.fuelCost)
        setTime(log.localDateTime.split('T')[1])
        setDate(log.localDateTime.split('T')[0])
        setCountry(log.location.country)
        setState(log.location.state)
        setPostalCode(log.location.postalCode)
        setDoorNumber(log.location.doorNumber)
      } else {
        const log = await axiosInstance.get(`/private/log/${id}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        setFuel(log.fuelAmount)
        setCost(log.fuelCost)
        setTime(log.localDateTime.split('T')[1])
        setDate(log.localDateTime.split('T')[0])
        setCountry(log.location.country)
        setState(log.location.state)
        setPostalCode(log.location.postalCode)
        setDoorNumber(log.location.doorNumber)
      }
    }
    getLog()
  }, [cache, id, setCost, setCountry, setDate, setDoorNumber, setFuel, setPostalCode, setState, setTime, sheetId])

  return (
    <LogForm submitFunc={null} btnText='Update Log'/>
  )
}

export default UpdateLog