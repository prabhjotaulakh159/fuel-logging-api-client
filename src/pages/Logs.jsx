import { useParams, useNavigate } from 'react-router-dom' 
import { useAxiosErrorHandling, axiosInstance } from '../axiosConfig'
import { useEffect } from 'react'
import { useLogContext } from '../context/LogContext'
import { useMessageContext } from '../context/MessageContext'
import LogForm from '../components/LogForm'

const Logs = () => {
  useAxiosErrorHandling()

  const { sheetId, sheetName } = useParams()
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } = useMessageContext()
  const {
    logs, setLogs,
    fuel,
    cost,
    time,
    country,
    state,
    postalCode,
    doorNumber,
    cache, setCache,
    date
  } = useLogContext()
  const navigate = useNavigate()

  useEffect(() => {
    const getLogs = async () => {
      if (cache[sheetId]) {
        setLogs(cache[sheetId])
      } else {
        const response = await axiosInstance.get(`/private/log/all/${sheetId}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        setCache((prevCache) => ({ ...prevCache, [sheetId]: response.data }));
        setLogs(cache[sheetId])
      }
    }
    getLogs()
  }, [cache, setLogs, sheetId, setErrorMessage, setCache, setSuccessMessage])

  const createLog = async (e) => {
    e.preventDefault()
    try {
      const body = {
        fuelAmount: fuel,
        fuelCost: cost,
        localDateTime: `${date}T${time}`,
        country: country,
        state: state,
        postalCode: postalCode,
        doorNumber: doorNumber
      }
      const response = await axiosInstance.post(`/private/log/create/${sheetId}`, body, {
        headers: { 'Authorization': localStorage.getItem('token') }
      })
      setCache((prevCache) => ({...prevCache, [sheetId]: response.data}))
      setSuccessMessage('Successfully created trip')
    } catch (e) {
      console.error(e)
    }
  }

  const deleteLog = async (id) => {
    const yes = window.confirm('Are you sure you want to delete this log ?')
    if (!yes) {
      return
    }
    try {
      await axiosInstance.delete(`/private/log/delete/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token') 
        }
      })
      const newLogs = logs.filter(log => log.logId !== id);
      setCache((prevCache) => ({...prevCache, [sheetId]: newLogs}));
      setLogs(newLogs);
      setSuccessMessage('Log deleted successfully');
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='container mt-5'>
      <h1>Currently viewing sheet: {sheetName}</h1>
      <LogForm submitFunc={createLog} btnText='Create Log'/>
      <div className="mt-4 text-danger">{errorMessage}</div>
      <div className="mt-4 text-success">{successMessage}</div>
      <div className='table-responsive mt-5'>
      <table className="table table-striped autoflow-x:auto">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Update</th>
            <th>Log ID</th>
            <th>Fuel Amount</th>
            <th>Fuel Cost</th>
            <th>Local Date Time</th>
            <th>Country</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Door Number</th>
          </tr>
        </thead>
        <tbody>
          {logs && logs.map((log) => {
            return (
              <tr key={log.log_id}>
                <td>
                  <button onClick={() => deleteLog(log.logId)} className="btn btn-danger">Delete</button>
                </td>
                <td>
                  <button onClick={() => navigate(`/logs/update/${log.logId}/${sheetId}`)} className="btn btn-primary">Update</button>
                </td>
                <td>{log.logId}</td>
                <td>{log.fuelAmount} L</td>
                <td>{log.fuelCost}$</td>
                <td>{log.localDateTime}</td>
                <td>{log.location.country}</td> 
                <td>{log.location.state}</td>
                <td>{log.location.postalCode}</td>
                <td>{log.location.doorNumber}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Logs
