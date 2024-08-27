import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import axiosInstance, { useAxiosErrorHandling } from '../axiosConfig'
import { AppContext } from '../App'
import './UpdateSheet.css'

const UpdateSheet = () => {
  useAxiosErrorHandling()
  const { id } = useParams()
  const { sheetName, setSheetName } = useContext(AppContext)

  useEffect(() => {
    axiosInstance.get(`/private/sheet/${id}`)
      .then(response => setSheetName(response.data.sheetName))
  }, [id, setSheetName])

  return (
    <div className="container d-flex justify-content-center align-items-start align-items-md-center min-vh-100 py-3 py-md-5">
      <form className="__form w-100 p-4 border rounded shadow">
          <h2 className="text-center mb-4">Change sheet name</h2>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              className="form-control" 
              id="new-sheet-name" 
              placeholder="Enter new sheet name" 
              value={sheetName}
              onInput={e => setSheetName(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
  )
}

export default UpdateSheet;