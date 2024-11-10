import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import homeIcon from './assets/home.png'

function Criterio() {
  const navigate = useNavigate()
  const [pesos, setPesos] = useState({})

  const handleRedirectToHome = () => {
    navigate('/')
  }

  const criterios = [
    'Valor del producto',
    'Urgencia',
    'Complejidad',
    'Riesgo',
    'Dependencias',
  ]

  const pesosCriterios = {
    'Valor del producto': 0.4,
    Urgencia: 0.2,
    Complejidad: 0.2,
    Riesgo: 0.1,
    Dependencias: 0.1,
  }

  const [selectedCriterios, setSelectedCriterios] = useState([])
  const [ratings, setRatings] = useState({})
  const [promedioPonderado, setPromedioPonderado] = useState(0)
  const [isCalculated, setIsCalculated] = useState(false)

  const handleSelect = (criterio) => {
    const nuevosCriterios = selectedCriterios.includes(criterio)
      ? selectedCriterios.filter((c) => c !== criterio)
      : [...selectedCriterios, criterio]

    setSelectedCriterios(nuevosCriterios)

    const nuevosRatings = { ...ratings }
    if (nuevosCriterios.includes(criterio)) {
      if (!nuevosRatings.hasOwnProperty(criterio)) {
        nuevosRatings[criterio] = 1
      }
    } else {
      delete nuevosRatings[criterio]
    }

    setRatings(nuevosRatings)
  }

  const handleRatingChange = (criterio, rating) => {
    const nuevosRatings = { ...ratings, [criterio]: rating }
    setRatings(nuevosRatings)
  }

  const calcularPesos = () => {
    let totalPonderado = 0

    selectedCriterios.forEach((criterio) => {
      const rating = ratings[criterio] || 1
      const peso = pesosCriterios[criterio] || 0
      totalPonderado += rating * peso
    })

    setPromedioPonderado(totalPonderado.toFixed(2))
    setIsCalculated(true)
  }

  const guardarPromedioPonderado = () => {
    const moduloSeleccionado = localStorage.getItem('selectedModule')
    if (moduloSeleccionado) {
      // Obtén el promedio actual almacenado y la cantidad de guardados
      const promedioAnterior =
        parseFloat(localStorage.getItem(`promedio_${moduloSeleccionado}`)) || 0
      const contador =
        parseInt(localStorage.getItem(`contador_${moduloSeleccionado}`)) || 0

      // Suma el nuevo promedio al acumulado y ajusta el contador
      const nuevoPromedio =
        (promedioAnterior * contador + parseFloat(promedioPonderado)) /
        (contador + 1)
      console.log('a', contador)
      // Guarda el nuevo promedio ponderado y actualiza el contador
      localStorage.setItem(
        `promedio_${moduloSeleccionado}`,
        nuevoPromedio.toFixed(2)
      )
      localStorage.setItem(`contador_${moduloSeleccionado}`, contador + 1)

      alert(`Promedio guardado con exito`)
      navigate('/TablaProm')
    } else {
      alert('Por favor, selecciona un módulo primero.')
    }
  }

  return (
    <>
      <div className="bs">
        <button className="homeBtn" onClick={handleRedirectToHome}>
          <img className="iconHome" src={homeIcon} alt="Home Icon"></img>
          Inicio
        </button>
      </div>
      <div>
        <h1 className="elegirCriterios">
          Elija sus criterios a evaluar y su puntuación
        </h1>

        <ul>
          {criterios.map((criterio) => (
            <li key={criterio}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCriterios.includes(criterio)}
                  onChange={() => handleSelect(criterio)}
                />
                {criterio}
              </label>
              {selectedCriterios.includes(criterio) && (
                <select
                  value={ratings[criterio] || 1}
                  onChange={(e) =>
                    handleRatingChange(criterio, parseInt(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}
            </li>
          ))}
        </ul>

        <button className="pesosBtn" onClick={calcularPesos}>
          Calcular Pesos
        </button>

        <h2>Promedio Ponderado:</h2>
        <p>{promedioPonderado}</p>
      </div>

      <button
        className="saveBtn"
        onClick={guardarPromedioPonderado}
        disabled={!isCalculated}
      >
        Guardar
      </button>
    </>
  )
}

export default Criterio
