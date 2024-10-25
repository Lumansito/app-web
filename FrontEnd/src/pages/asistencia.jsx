import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAsistencia } from '../context/Asitencia/ProveedorAsistencia.jsx'

export const Asistencia = () => {
  const [dni, setDni] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()
  const { confirmAsistencia } = useAsistencia()

  useEffect(() => {
    let timer
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsModalOpen(false)
        setIsSuccess(false)
      }, 2000) // Aumentado a 2 segundos (2000ms)
    }
    return () => clearTimeout(timer)
  }, [isSuccess])

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await confirmAsistencia(dni)
      
      if(response.error) {
        setModalMessage(`Error: ${response.error}`)
        setIsSuccess(false)
      } else {
        setModalMessage('Asistencia confirmada')
        setIsSuccess(true)
        setDni('')
      }
    } catch (error) {
      setModalMessage('Error al confirmar la Asistencia')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    if (!isSuccess) {
      setIsModalOpen(false)
    }
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
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:bg-gray-400"
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className={`bg-white rounded-lg p-6 max-w-sm w-full ${isSuccess ? 'bg-green-100' : ''}`}>
            <p className={`mb-4 ${
              isSuccess 
                ? 'text-green-600 text-2xl font-bold' 
                : 'text-red-600 text-lg'
            }`}>
              {modalMessage}
            </p>
            {!isSuccess && (
              <button
                onClick={handleCloseModal}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}