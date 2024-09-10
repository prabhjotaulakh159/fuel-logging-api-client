import { useParams, useNavigate } from 'react-router-dom'
import { useLogContext } from '../context/LogContext'
import { useMessageContext } from '../context/MessageContext'
import { useEffect } from 'react'
import { useAxiosErrorHandling, axiosInstance } from '../axiosConfig'
import LogForm from '../components/LogForm'

const UpdateLog = () => {
  useAxiosErrorHandling()

  const { id, sheetId, sheetName } = useParams()
  const {
    fuel,setFuel,
    cost,setCost,
    time,setTime,
    country,setCountry,
    state,setState,
    postalCode,setPostalCode,
    doorNumber,setDoorNumber,
    date,setDate,
    logs,setLogs
  } = useLogContext()
  const { setSuccessMessage } = useMessageContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getLog = async () => {
      try {
        const log = await axiosInstance.get(`/private/log/${id}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        setFuel(log.data.fuelAmount)
        setCost(log.data.fuelCost)
        setTime(log.data.localDateTime.split('T')[1])
        setDate(log.data.localDateTime.split('T')[0])
        setCountry(log.data.location.country)
        setState(log.data.location.state)
        setPostalCode(log.data.location.postalCode)
        setDoorNumber(log.data.location.doorNumber)
      } catch (error) {
        console.error(error);
      }
        
    }
    getLog()
  }, [id, setCost, setCountry, setDate, setDoorNumber, setFuel, setPostalCode, setState, setTime, sheetId])

  const updateLog = async (e) => {
    try {
      e.preventDefault();
      const body = {
        fuelAmount: fuel,
        fuelCost: cost,
        localDateTime: `${date}T${time}`,
        country: country,
        state: state,
        postalCode: postalCode,
        doorNumber: doorNumber
      }
      const response = await axiosInstance.patch(`/private/log/update/${id}`, body, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });  
      const newLogs = logs.map(log => {
        if (log.logId === Number(id)) {
          return response.data;
        }
        return log
      })
      setLogs(newLogs);
      setSuccessMessage('Successfully updated log')
      setTimeout(() => navigate(`/logs/${sheetId}/${sheetName}`));
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <LogForm submitFunc={updateLog} btnText='Update Log'/>
  )
}

export default UpdateLog