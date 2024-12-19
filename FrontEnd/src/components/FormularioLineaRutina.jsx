import { useState, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEjercicios } from "../context/Ejercicio/proveedorEjercicio.jsx"
import { useRutinas } from "../context/Rutinas/ProveedorRutinas.jsx"

export  function FormularioLineaRutina({ dia, id, linea }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })
  
  const { ejercicios, cargarEjercicios } = useEjercicios()
  const { actualizarLineaRutina } = useRutinas()
  const [selectedEjercicio, setSelectedEjercicio] = useState(linea.codejercicio || "")

  const [lineaActual, setLineaActual] = useState({
    codejercicio: linea.codejercicio || "",
    series: linea.series || 0,
    rep: linea.rep || 0,
    id: linea.id,
    dia: linea.dia
  })

  useEffect(() => {
    cargarEjercicios()
  }, [])

  useEffect(() => {
    setLineaActual({
      codejercicio: linea.codejercicio || "",
      series: linea.series || 0,
      rep: linea.rep || 0,
      id: linea.id,
      dia: linea.dia
    })
  }, [linea])

  const handleEjercicioChange = (e) => {
    if (isDragging) return
    const newCodeEjercicio = e.target.value
    setSelectedEjercicio(newCodeEjercicio)
    const updatedLinea = { ...lineaActual, codejercicio: newCodeEjercicio }
    setLineaActual(updatedLinea)
    actualizarLineaRutina(dia, updatedLinea.id, updatedLinea)
  }

  const handleInputChange = (e) => {
    if (isDragging) return
    const { name, value } = e.target
    const updatedLinea = { ...lineaActual, [name]: parseInt(value, 10) || 0 }
    setLineaActual(updatedLinea)
    actualizarLineaRutina(dia, updatedLinea.id, updatedLinea)
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`bg-white rounded-lg shadow-md p-4 mb-4 ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className="space-y-4">
        <div className="relative">
          <label htmlFor={`ejercicio-${id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Ejercicio
          </label>
          <select
            id={`ejercicio-${id}`}
            value={selectedEjercicio}
            onChange={handleEjercicioChange}
            disabled={isDragging}
            className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none bg-white ${
              isDragging ? 'opacity-50 cursor-grabbing' : ''
            }`}
          >
            <option value="">Seleccionar ejercicio</option>
            {ejercicios && ejercicios.map((ejercicio) => (
              <option key={ejercicio.codEjercicio} value={ejercicio.codEjercicio}>
                {ejercicio.nombre}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor={`series-${id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Series
            </label>
            <input
              type="number"
              id={`series-${id}`}
              name="series"
              value={lineaActual.series}
              onChange={handleInputChange}
              disabled={isDragging}
              min="1"
              step="1"
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                isDragging ? 'opacity-50 cursor-grabbing' : ''
              }`}
            />
          </div>
          <div>
            <label htmlFor={`rep-${id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Repeticiones
            </label>
            <input
              type="number"
              id={`rep-${id}`}
              name="rep"
              value={lineaActual.rep}
              onChange={handleInputChange}
              disabled={isDragging}
              min="1"
              step="1"
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                isDragging ? 'opacity-50 cursor-grabbing' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}