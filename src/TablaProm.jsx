import React, { useEffect, useState } from 'react'
import './App.css' // Si tienes estilos específicos
import { useNavigate } from 'react-router-dom'
import homeIcon from './assets/home.png'

function TablaProm() {
  const navigate = useNavigate()

  const criterios = [
    'Crear cliente',
    'Inicio de sesión',
    'Cierre de sesión',
    'Facturación',
    'Inventarios',
  ]

  const pesos = [
    { nombre: 'Valor del producto', peso: '40%' },
    { nombre: 'Urgencia', peso: '20%' },
    { nombre: 'Complejidad', peso: '20%' },
    { nombre: 'Riesgo', peso: '10%' },
    { nombre: 'Dependencias', peso: '10%' },
  ]

  const [promedios, setPromedios] = useState({})

  useEffect(() => {
    const promediosGuardados = {}
    criterios.forEach((criterio) => {
      const promedio = localStorage.getItem(`promedio_${criterio}`)
      promediosGuardados[criterio] = promedio ? parseFloat(promedio) : 0
    })
    setPromedios(promediosGuardados)
  }, [])

  const handleRedirectToHome = () => {
    navigate('/')
  }

  // Convertimos los promedios en un array, lo ordenamos y mapeamos para renderizar
  const promediosOrdenados = Object.entries(promedios).sort(
    ([, promedioA], [, promedioB]) => promedioB - promedioA
  )

  return (
    <>
      <div>
        <button className="homeBtn" onClick={handleRedirectToHome}>
          <img className="iconHome" src={homeIcon} alt="Home Icon" />
          Inicio
        </button>
      </div>

      <div className="contentTable">
        <h2>Tabla de Módulos y Promedios</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Promedio de calificación (%)</th>
            </tr>
          </thead>
          <tbody>
            {promediosOrdenados.map(([criterio, promedio]) => (
              <tr key={criterio}>
                <td>{criterio}</td>
                <td>{`${promedio.toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Tabla de Pesos de los Criterios</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              {pesos.map((criterio) => (
                <th key={criterio.nombre}>{criterio.nombre}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {pesos.map((criterio) => (
                <td key={criterio.nombre}>{criterio.peso}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TablaProm
