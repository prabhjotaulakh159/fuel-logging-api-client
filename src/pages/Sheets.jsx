import { useEffect, useContext } from 'react'
import { AppContext } from '../App'
import axios from 'axios'

const Sheets = () => {
  const { loading, setLoading, error, setError, sheets, setSheets } = useContext(AppContext)

  const deleteSheet = async (id) => {
    setLoading(true)
    try {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/private/sheet/delete/${id}`)
      if (response.status === 200) {
        const newSheets = sheets.filter(sheet => sheet.sheet_id !== id, {
          headers: { 'Authorization': localStorage.getItem('token') }
        })
        setSheets(newSheets)
        setLoading(false)
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {}
      setLoading(false)
      setError(e.message)
    }
  } 

  useEffect(() => {
    setError(false)
    setLoading(true)
    if (sheets.length === 0) {
      const token = localStorage.getItem('token')
      axios.get(process.env.REACT_APP_API_URL + '/private/sheet/all', {
        headers: {
          'Authorization': token
        }
      })
      .then(response => {
        setSheets(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [sheets.length, setSheets, setLoading, setError])

  if (loading) {
    return <div className="mt-4">Loading...</div>
  }

  if (error) {
    return <div className="mt-4 text-danger">Error: {error}</div>
  }

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap gap-4">
        {sheets.map(sheet => {
          return (
            <div className="card mb-4" style={{ width: '18rem' }} key={sheet.sheetId}>
              <div className="card-body">
                <h5 className="card-title">{sheet.sheetName}</h5>
                <div className="d-flex flex-wrap gap-2 mt-4">
                  <div className="btn btn-primary">View Logs</div>
                  <div className="btn btn-secondary">Update Sheet</div>
                  <div onClick={() => deleteSheet(sheet.sheetId)} className="btn btn-danger">Delete Sheet</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sheets