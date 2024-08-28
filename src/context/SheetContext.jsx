import { createContext, useState, useContext } from 'react'

const SheetContext = createContext()

export const useSheetContext = () => {
  return useContext(SheetContext)
}

const SheetContextProvider = ({children}) => {
  const [sheets, setSheets] = useState([])
  const [sheetName, setSheetName] = useState('')

  const contextValue = {
    sheets, 
    sheetName,
    setSheets,
    setSheetName
  }

  return (
    <SheetContext.Provider value={contextValue}>
      {children}
    </SheetContext.Provider>
  ) 
}

export default SheetContextProvider