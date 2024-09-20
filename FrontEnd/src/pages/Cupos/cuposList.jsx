// archivo: CuposListPage.js

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CupoContext } from "../../context/Cupo/CupoContext";
import DayList from "../../components/DayList";

function CuposListPage() {
  const { loadCupos, cupos, error } = useContext(CupoContext); // Usamos el contexto
  const [selectedDay, setSelectedDay] = useState("");
  const daysWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    loadCupos();
  }, []);

  useEffect(() => {
    // Log para ver los cupos cargados
    if (cupos.length > 0) {
      console.log("Cupos cargados:", cupos);
    }
  }, [cupos]);

  const handleSelect = (day) => {
    setSelectedDay(day);
  };

  if (error) {
    return <p>Error al cargar los cupos: {error}</p>; // Muestra el error si ocurre
  }

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Cupos por Día</h1>
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <ul className="p-4 space-y-4">
          {daysWeek.map((day) => (
            <li
              key={day}
              onClick={() => handleSelect(day)}
              className={`cursor-pointer text-center p-2 rounded-lg ${
                selectedDay === day
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-blue-300 transition-colors`}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>

      {selectedDay && (
        <div className="mt-6">
          <DayList
            day={selectedDay}
            cupos={cupos.filter(
              (cupo) =>
                cupo.diaSemana && cupo.diaSemana.toLowerCase() === selectedDay.toLowerCase()
            )} // Verifica que cupo.diaSemana no sea undefined antes de llamar a toLowerCase
            navigate={navigate}
          />
        </div>
      )}
    </div>
  );
}

export default CuposListPage;
