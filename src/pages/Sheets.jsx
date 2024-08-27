import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axiosInstance, { useAxiosErrorHandling } from '../axiosConfig'

const Sheets = () => {
  useAxiosErrorHandling()

  const nav = useNavigate()
  const { loading, setLoading, error, setError, sheets, setSheets, sheetName, setSheetName,
          message
   } = useContext(AppContext)

  const deleteSheet = async (id) => {
    try {
      setLoading(true)
      await axiosInstance.delete(`/private/sheet/delete/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      const newSheets = sheets.filter(sheet => sheet.sheetId !== id)
      setSheets(newSheets)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const createSheet = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const body = {sheetName: sheetName}
      const response = await axiosInstance.post('/private/sheet/create', body, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
      const newSheet = response.data;
      setSheets(prevSheets => [...prevSheets, newSheet]);
      setSheetName('')
    } catch (e) {
      console.error(e) 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSheets = async () => {
      setError(false)
      setLoading(true)
      if (sheets.length === 0) {
        const token = localStorage.getItem('token');
        try {
          const response = await axiosInstance.get(process.env.REACT_APP_API_URL + '/private/sheet/all', {
            headers: {
              'Authorization': token
            }
          })
          setSheets(response.data)
        } catch (e) {
          console.error(e)
          setError(e.message || 'Failed to fetch sheets');
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchSheets()
  }, [sheets.length, setSheets, setLoading, setError]);

  if (loading) {
    return <div className="mt-4">Loading...</div>
  }

  return (
    <div className="container mt-5">
      <div className="mt-4 text-danger">{error}</div>
      <div className="mt-4 text-success">{message}</div>
      <form onSubmit={createSheet} className="d-flex flex-column flex-md-row gap-2">
        <input type="text" value={sheetName} onInput={e => setSheetName(e.target.value)} required placeholder="Sheet name"/>
        <button type="submit" className="btn btn-primary">Create sheet</button>
      </form>
      { 
        sheets.length > 0 ? 
        <div className="d-flex flex-wrap gap-4 mt-4">
          {sheets.map(sheet => {
            return (
              <div className="card mb-4" style={{ width: '18rem' }} key={sheet.sheetId}>
                <div className="card-body">
                  <h5 className="card-title">{sheet.sheetName}</h5>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <div className="btn btn-primary">View Logs</div>
                    <div onClick={() => nav(`/update-sheet/${sheet.sheetId}`)} className="btn btn-secondary">Update Sheet</div>
                    <div onClick={() => deleteSheet(sheet.sheetId)} className="btn btn-danger">Delete Sheet</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div> 
        : 
        <div className="mt-4">No sheets for now...</div>
      }
    </div>
  )
}

export default Sheets