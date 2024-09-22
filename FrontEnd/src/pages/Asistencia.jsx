import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Asistencia = () => {
  const [dni, setDni] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    // Aquí iría la lógica para buscar la asistencia
    console.log('Buscando asistencia para DNI:', dni)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
      <div className="max-w-md mx-auto mt-12">
        <button
          onClick={handleGoBack}
          className="mb-4 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
        >
          ← Volver
        </button>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-black px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-white text-center">Asistencia</h1>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Ingrese el DNI"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  DNI
                </label>
                <span className="text-gray-500 sm:text-sm mr-2">DNI</span>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={handleSearch}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}