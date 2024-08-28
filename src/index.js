import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext'
import SheetContextProvider from './context/SheetContext'
import MessageContextProvider from './context/MessageContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <AuthContextProvider>
            <SheetContextProvider>
                <MessageContextProvider>
                    <App />
                </MessageContextProvider>
            </SheetContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
)