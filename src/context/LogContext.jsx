import { createContext, useContext, useState } from 'react'

const LogContext = createContext()

export const useLogContext = () => {
  return useContext(LogContext)
}

const LogContextProvider = ({children}) => {
  const [logs, setLogs] = useState('')
  const [fuel, setFuel] = useState(0)
  const [cost, setCost] = useState(0)
  const [date, setDate] = useState(undefined)
  const [time, setTime] = useState(undefined)
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [doorNumber, setDoorNumber] = useState(0)
  const [cache, setCache] = useState({})

  const contextValue = {
    logs, setLogs,
    fuel, setFuel,
    cost, setCost,
    time, setTime,
    country, setCountry,
    state, setState,
    postalCode, setPostalCode,
    doorNumber, setDoorNumber,
    date, setDate,
    cache, setCache
  }
  
  return (
    <LogContext.Provider value={contextValue}>
      {children}
    </LogContext.Provider>
  )
}

export default LogContextProvider