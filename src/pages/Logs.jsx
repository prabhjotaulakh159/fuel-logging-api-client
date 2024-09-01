import { useParams } from 'react-router-dom' 
import { useAxiosErrorHandling, axiosInstance } from '../axiosConfig'
import { useEffect } from 'react'
import { useLogContext } from '../context/LogContext'
import { useMessageContext } from '../context/MessageContext'
import { countries } from './countries'

const Logs = () => {
  useAxiosErrorHandling()

  const { sheetId, sheetName } = useParams()
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } = useMessageContext()
  const {
    logs, setLogs,
    fuel, setFuel,
    cost, setCost,
    time, setTime,
    country, setCountry,
    state, setState,
    postalCode, setPostalCode,
    doorNumber, setDoorNumber,
    cache, setCache,
    date, setDate
  } = useLogContext()

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
        console.log(response)
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

  return (
    <div className='container mt-5'>
      <h1>Currently viewing sheet: {sheetName}</h1>
      <form className='row g-3 mt-4' onSubmit={createLog}>
        <div className="col-md-4">
          <label htmlFor="fuelInput" className="form-label">Fuel Amount</label>
          <input id="fuelInput" type="number" className="form-control" required value={fuel} onInput={e => setFuel(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="costInput" className="form-label">Cost</label>
          <input id="costInput" type="number" className="form-control" required value={cost} onInput={e => setCost(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="timeInput" className="form-label">Date</label>
          <input id="timeInput" type="date" className="form-control" required value={date} onInput={e => setDate(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="timeInput" className="form-label">Time</label>
          <input id="timeInput" type="time" className="form-control" required value={time} onInput={e => setTime(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="countrySelect" className="form-label">Country</label>
          <select id="countrySelect" className="form-select" required value={country} onChange={e => setCountry(e.target.value)}>
            <option value="" disabled>Select a country</option>
            {countries.map((country, key) => (
              <option key={key} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="stateInput" className="form-label">State</label>
          <input id="stateInput" type="text" className="form-control" required value={state} onInput={e => setState(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="postalCodeInput" className="form-label">Postal Code</label>
          <input id="postalCodeInput" type="text" className="form-control" required value={postalCode} onInput={e => setPostalCode(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="doorNumberInput" className="form-label">Door Number</label>
          <input id="doorNumberInput" type="number" className="form-control" required value={doorNumber} onInput={e => setDoorNumber(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Create trip</button>
        </div>
      </form>
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
                  <button className="btn btn-danger">Delete</button>
                </td>
                <td>
                  <button className="btn btn-primary">Update</button>
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
