import { useEjercicios } from "../context/Ejercicio/EjercicioProvider";

import { useState, useEffect } from "react";
import { useRutinas } from "../context/Rutinas/RutinasProvider"; // Importar el contexto

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function LineaRutinaForm({ id, linea }) {
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
    loadEjercicios();
  }, []);

  // Sincronizar lineaActual cuando cambien las props
  useEffect(() => {
    setLineaActual({
      codejercicio: linea.codejercicio || "",
      series: linea.series || 0,
      rep: linea.rep || 0,
      id: linea.id,  // Asegurar que el id se mantenga
    });
  }, [linea]);

  const handleEjercicioChange = (e) => {
    const newCodeEjercicio = e.target.value;
    setSelectedEjercicio(newCodeEjercicio);

    const updatedLinea = { ...lineaActual, codejercicio: newCodeEjercicio };

    setLineaActual(updatedLinea);
    updateLineaRutina(updatedLinea.id, updatedLinea); // Usar updatedLinea.id para mantener el id
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedLinea = { ...lineaActual, [name]: value };

    setLineaActual(updatedLinea);
    updateLineaRutina(updatedLinea.id, updatedLinea); // Usar updatedLinea.id para mantener el id
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: "2px solid blue",
    padding: "10px",
    margin: "5px",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="LineaRutinaForm">
      <label>Seleccionar Ejercicio:</label>
      <select value={selectedEjercicio} onChange={handleEjercicioChange}>
        <option value="">--Seleccionar--</option>
        {ejercicios &&
          ejercicios.map((ejercicio) => (
            <option key={ejercicio.codEjercicio} value={ejercicio.codEjercicio}>
              {ejercicio.nombre}
            </option>
          ))}
      </select>

      <div>
        <label>Series:</label>
        <input
          type="number"
          name="series"
          value={lineaActual.series}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Repeticiones:</label>
        <input
          type="number"
          name="rep"
          value={lineaActual.rep}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
