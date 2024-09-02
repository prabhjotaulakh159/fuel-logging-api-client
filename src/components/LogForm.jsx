import { useLogContext } from '../context/LogContext'
import { countries } from '../pages/countries'

const LogForm = ({submitFunc, btnText}) => {
  const {
    fuel, setFuel,
    cost, setCost,
    time, setTime,
    country, setCountry,
    state, setState,
    postalCode, setPostalCode,
    doorNumber, setDoorNumber,
    date, setDate
  } = useLogContext()

  return (
    <form className='row g-3 mt-4' onSubmit={submitFunc}>
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
          <button type="submit" className="btn btn-primary">{btnText}</button>
        </div>
      </form>
  )
}

export default LogForm