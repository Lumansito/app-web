import { useEjercicios } from "../context/Ejercicio/EjercicioProvider";

import { useState, useEffect } from "react";
import { useRutinas } from "../context/Rutinas/RutinasProvider"; // Importar el contexto

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function LineaRutinaForm({ dia,id, linea }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const { ejercicios, loadEjercicios } = useEjercicios();
  const { updateLineaRutina } = useRutinas(); // Obtener la función para actualizar el contexto
  const [selectedEjercicio, setSelectedEjercicio] = useState(linea.codejercicio || "");

  const [lineaActual, setLineaActual] = useState({
    codejercicio: linea.codejercicio || "",
    series: linea.series || 0,
    rep: linea.rep || 0,
    id: linea.id,  // Asegurar que id esté en el estado inicial
  });

  useEffect(() => {
    loadEjercicios(); // Cargar los ejercicios disponibles cuando se monta el componente
  }, []);

  // Sincronizar lineaActual cuando cambien las props
  useEffect(() => {
    setLineaActual({
      codejercicio: linea.codejercicio || "",
      series: linea.series || 0,
      rep: linea.rep || 0,
      id: linea.id,
      dia: linea.dia  // Asegurar que el id se mantenga actualizado
    });
  }, [linea]);

  // Manejar cambio de ejercicio
  const handleEjercicioChange = (e) => {
    const newCodeEjercicio = e.target.value;
    setSelectedEjercicio(newCodeEjercicio);

    const updatedLinea = { ...lineaActual, codejercicio: newCodeEjercicio };

    setLineaActual(updatedLinea);
    updateLineaRutina(dia,updatedLinea.id, updatedLinea); // Actualizar la línea en el contexto
  };

  // Manejar cambios en series o repeticiones
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedLinea = { ...lineaActual, [name]: value };

    setLineaActual(updatedLinea);
    updateLineaRutina(dia,updatedLinea.id, updatedLinea); // Actualizar la línea en el contexto
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div 
      ref={setNodeRef} 
      {...attributes} 
      {...listeners} 
      style={style} 
      className="LineaRutinaForm bg-blue-500 rounded-2xl p-4 shadow-md mx-auto w-full max-h-28 max-w-2xl mb-4"
    >
      <div className="flex items-center justify-between gap-x-4 w-full">
        {/* Selector del ejercicio ocupa el 50% */}
        <div className="w-1/2">
          <label className="text-white text-sm mb-1">Ejercicio:</label>
          <select 
            value={selectedEjercicio} 
            onChange={handleEjercicioChange} 
            className="p-1 bg-gray-200 text-black rounded-md w-full text-xs"
          >
            <option value="">Seleccionar</option>
            {ejercicios &&
              ejercicios.map((ejercicio) => (
                <option key={ejercicio.codEjercicio} value={ejercicio.codEjercicio}>
                  {ejercicio.nombre}
                </option>
              ))}
          </select>
        </div>
  
        {/* Series y Repeticiones ocupan el 25% cada uno */}
        <div className="w-1/4">
          <label className="text-white text-sm mb-1">Series:</label>
          <input
            type="number"
            name="series"
            value={lineaActual.series}
            onChange={handleInputChange}
            className="p-2 bg-gray-200 rounded-md text-black text-base w-full"
            min="1" // Solo permite números positivos
            step="1" // Solo permite enteros
          />
        </div>
  
        <div className="w-1/4">
          <label className="text-white text-sm mb-1">Repeticiones:</label>
          <input
            type="number"
            name="rep"
            value={lineaActual.rep}
            onChange={handleInputChange}
            className="p-2 bg-gray-200 rounded-md text-black text-base w-full"
            min="1" // Solo permite números positivos
            step="1" // Solo permite enteros
          />
        </div>
      </div>
    </div>
  );
  
  
}
