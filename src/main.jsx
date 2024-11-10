import { StrictMode } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css' // Asegúrate de que este archivo exista o elimina la línea
import App from './App.jsx'
import Criterios from './Criterios.jsx'
import TablaProm from './TablaProm.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Criterios" element={<Criterios />} />
      <Route path="/TablaProm" element={<TablaProm />} />
    </Routes>
  </Router>
)
