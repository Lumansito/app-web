
import { useEjercicios } from "../context/Ejercicio/EjercicioProvider";

import { useState, useEffect } from 'react';
import { useRutinas } from '../context/Rutinas/RutinasProvider'; // Importar el contexto

export function LineaRutinaForm({ index }) {

  const { ejercicios, loadEjercicios } = useEjercicios();
  const { updateLineaRutina } = useRutinas(); // Obtener la función para actualizar el contexto
  const [selectedEjercicio, setSelectedEjercicio] = useState('');
  const [linea, setLinea] = useState({
    codejercicio: '',
    series: '',
    rep: '',
  });

  useEffect(() => {
    loadEjercicios();
  }, []);

  const handleEjercicioChange = (e) => {
    const newCodeEjercicio = e.target.value;
    setSelectedEjercicio(newCodeEjercicio);
    const updatedLinea = { ...linea, codejercicio: newCodeEjercicio };
    setLinea(updatedLinea);
    updateLineaRutina(index, updatedLinea); // Actualizar el contexto
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedLinea = { ...linea, [name]: value };
    setLinea(updatedLinea);
    updateLineaRutina(index, updatedLinea); // Actualizar el contexto
  };

  return (
    <div className="LineaRutinaForm">
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
          value={linea.series}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Repeticiones:</label>
        <input
          type="number"
          name="rep"
          value={linea.rep}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
