import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useRutinas } from "../../context/Rutinas/RutinasProvider"
import { Solicitud } from "../../components/Solicitud"
import { ConjuntoLineas } from "../../components/ConjuntoLineas"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

export const FormRutinaSolicitud = () => {
  const {
    solicitud,
    loadSolicitud,
    diasRutina,
    setDiasRutina,
    indice,
    setIndice,
    uploadRutina,
    comprobarLineasRutina,
  } = useRutinas()
  const [currentPage, setCurrentPage] = useState(0)

  const navigate = useNavigate()
  const params = useParams()
  const idSolicitud = params.idSolicitud

  useEffect(() => {
    if (idSolicitud) {
      loadSolicitud(idSolicitud)
    }
  }, [idSolicitud, loadSolicitud])

  const handleClickButton = async () => {
    const dia = comprobarLineasRutina()
    if (dia) {
      alert(
        "Por favor, complete todas las líneas de la rutina. Compruebe dia: " +
          dia
      )
      return
    }
    try {
      const response = await uploadRutina()
      if (response) {
        alert("Rutina subida correctamente")
        setDiasRutina({ dia: 1, lineas: [] })
        navigate("/rutinas/solicitudes")
      } else {
        alert("Error al subir la rutina")
      }
    } catch (error) {
      console.error("Error durante la subida de la rutina:", error)
      alert("Ocurrió un error al subir la rutina")
    }
  }

  const handleAñadirLinea = () => {
    setDiasRutina((prevDiasRutina) => {
      return prevDiasRutina.map((diaRutina, index) => {
        if (index === currentPage) {
          return {
            ...diaRutina,
            lineas: [
              ...diaRutina.lineas,
              {
                codEjercicio: "",
                series: "0",
                rep: "0",
                id: indice,
                dia: diaRutina.dia,
              },
            ],
          }
        }
        return diaRutina
      })
    })
    setIndice(indice + 1)
  }

  const handleAñadirDia = () => {
    setDiasRutina((prevDiasRutina) => [
      ...prevDiasRutina,
      { dia: prevDiasRutina.length + 1, lineas: [] },
    ])
    setCurrentPage(diasRutina.length)
  }

  const handleEliminarDia = () => {
    if (diasRutina.length === 1) {
      return
    }
    if (currentPage === diasRutina.length - 1) {
      setCurrentPage(currentPage - 1)
      setDiasRutina(diasRutina.slice(0, -1))
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getLineaPos = (lineas, id) =>
    lineas.findIndex((linea) => linea.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id === over.id) return
    setDiasRutina((diasRutina) => {
      return diasRutina.map((diaRutina, index) => {
        if (index === currentPage) {
          const newLineas = arrayMove(
            diaRutina.lineas,
            getLineaPos(diaRutina.lineas, active.id),
            getLineaPos(diaRutina.lineas, over.id)
          )
          return { ...diaRutina, lineas: newLineas }
        }
        return diaRutina
      })
    })
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < diasRutina.length) {
      setCurrentPage(newPage)
    }
  }

  if (!solicitud) {
    return <div className="text-center mt-8">Cargando solicitud...</div>
  }

  const diaActual = diasRutina[currentPage]

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors flex items-center"
            aria-label="Volver al inicio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver
          </button>
          <h1 className="text-2xl font-bold text-center">Solicitud de Rutina</h1>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4">
            <Solicitud solicitud={solicitud} modo="descripcion" />
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Día {diaActual.dia} de la Rutina
          </h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <ConjuntoLineas lineas={diaActual.lineas} dia={diaActual.dia} />
          </DndContext>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleAñadirLinea}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors"
          >
            Añadir otra línea
          </button>
          <button
            onClick={handleAñadirDia}
            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition-colors"
          >
            Añadir Nuevo Día
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 transition-colors"
            disabled={currentPage === 0}
          >
            Día Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-black rounded-md px-4 py-2 transition-colors"
            disabled={currentPage === diasRutina.length - 1}
          >
            Día Siguiente
          </button>
          <button
            onClick={handleEliminarDia}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 transition-colors"
            disabled={diasRutina.length === 1}
          >
            Eliminar Día
          </button>
          <button
            onClick={handleClickButton}
            className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 transition-colors"
          >
            Subir Rutina
          </button>
        </div>
      </div>
    </div>
  )
}