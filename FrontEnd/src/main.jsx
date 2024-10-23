import React from 'react'
import ReactDOM from 'react-dom/client'
import Aplicacion from './Aplicacion.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <aplicacion />
    </BrowserRouter>
  </React.StrictMode>,
)
