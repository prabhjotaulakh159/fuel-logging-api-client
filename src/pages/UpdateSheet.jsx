import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { axiosInstance, useAxiosErrorHandling } from '../axiosConfig'
import { useMessageContext } from '../context/MessageContext'
import { useSheetContext } from '../context/SheetContext'

const UpdateSheet = () => {
  useAxiosErrorHandling();
  const navigate = useNavigate();
  const { id } = useParams();
  const { errorMessage, setErrorMessage, loading, setLoading } = useMessageContext()
  const { setSheets, sheets, setMessage, sheetName, setSheetName } = useSheetContext()

  useEffect(() => {
    setErrorMessage('');
    const getSheet = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/private/sheet/${id}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        setSheetName(response.data.sheetName); 
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    };

    getSheet();
  }, [id, setErrorMessage, setLoading, setSheetName])

  const changeSheetName = async (e) => {
    e.preventDefault();
    try {
      const body = { sheetName }; 
      await axiosInstance.put(`/private/sheet/update/${id}`, body, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setMessage(`Successfully updated sheet to ${sheetName}`)
      const newSheets = sheets.map(sheet => {
        // keep this double equality
        if (sheet.sheetId === Number(id)) {
          return { ...sheet, sheetName }
        }
        return sheet; 
      })
      setSheets(newSheets)
      setTimeout(() => navigate('/sheets'), 1000)
    } catch (e) {
      console.error(e)
    }
  };

  if (loading) {
    return <div className="mt-4">Loading...</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-start align-items-md-center min-vh-100 py-3 py-md-5">
      <div className="mt-4 text-danger">{errorMessage}</div>
      <form onSubmit={changeSheetName} className="__form w-100 p-4 border rounded shadow">
        <h2 className="text-center mb-4">Change sheet name</h2>
        <div className="form-group mb-3">
          <label htmlFor="new-sheet-name">New Sheet Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="new-sheet-name" 
            placeholder="Enter new sheet name" 
            value={sheetName} 
            onChange={(e) => setSheetName(e.target.value)} 
            onInput={() => setErrorMessage('')} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
};

export default UpdateSheet;
