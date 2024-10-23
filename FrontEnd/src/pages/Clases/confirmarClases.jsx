import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useClases } from "../../context/Clases/proveedorClases.jsx"
import { Clase } from "../../components/Clase"

export const ConfirmarClases = () => {
  const { clase, loadClase, reservarClase } = useClases()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const { idClase } = params

  useEffect(() => {
    loadClase(idClase)
  }, [idClase])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      const response = await reservarClase(clase.dniInstructor, clase.horario)
      if (response.success) {
        setModalMessage("Clase reservada con éxito")
      } else {
        setModalMessage(`Error al reservar la clase: ${response.error}`)
      }
    } catch (error) {
      setModalMessage("Error al reservar la clase")
    } finally {
      setIsLoading(false)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (modalMessage === "Clase reservada con éxito") {
      navigate("/clases")
    }
  }

  const handleGoBack = () => {
    navigate('/clases')
  }

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 relative">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
      <div className="max-w-md mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold">Confirmar Clase</h1>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4">
            {clase ? <Clase clase={clase} /> : <p className="text-center">Cargando...</p>}
          </div>
        </div>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {isLoading ? "Confirmando..." : "Confirmar Asistencia"}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <p className="text-lg mb-4">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
