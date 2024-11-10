import { useState } from 'react'
import './App.css' // Si tienes estilos específicos
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TablaProm from './TablaProm'

function App() {
  const cosas = [
    'Crear cliente',
    'Inicio de sesión',
    'Cierre de sesión',
    'Facturación',
    'Inventarios',
  ]
  const navigate = useNavigate()
  const handleRedirectTable = () => {
    navigate('/TablaProm')
  }

  const handleSelect = (cosa) => {
    localStorage.setItem('selectedModule', cosa) // Guarda el nombre del módulo
    navigate('/Criterios') // Redirige a la página de detalle
  }
  const handleReset = () => {
    localStorage.clear() // Limpia todo el localStorage
    alert('Todo el progreso ha sido borrado.') // Puedes mostrar un mensaje si lo deseas
  }

  return (
    <>
      <div className="divBtn">
        <button className="volverBtn" onClick={handleReset}>
          Resetear todo
        </button>
        <button className="menuBtn" onClick={handleRedirectTable}>
          Ver promedios
        </button>
      </div>
      <div>
        <h1>Elija un modulo a evaluar</h1>
        <ul>
          {cosas.map((cosa, index) => (
            <li key={index}>
              <a
                className="links"
                href="#"
                onClick={(e) => {
                  e.preventDefault() // Evita el comportamiento predeterminado del enlace
                  handleSelect(cosa) // Llama a la función de selección
                }}
              >
                {cosa}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
