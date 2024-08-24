import { useEffect, useContext } from 'react'
import { AppContext } from '../App'
import axiosInstance, { useAxiosErrorHandling } from '../axiosConfig'

const Sheets = () => {
  useAxiosErrorHandling()
  const { loading, setLoading, error, setError, sheets, setSheets } = useContext(AppContext)

  const deleteSheet = async (id) => {
    setLoading(true)
    await axiosInstance.delete(`/private/sheet/delete/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    const newSheets = sheets.filter(sheet => sheet.sheetId !== id)
    setSheets(newSheets)
    setLoading(false)
  }

  useEffect(() => {
    setError(false)
    setLoading(true)
    if (sheets.length === 0) {
      const token = localStorage.getItem('token')
      axiosInstance.get(process.env.REACT_APP_API_URL + '/private/sheet/all', {
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