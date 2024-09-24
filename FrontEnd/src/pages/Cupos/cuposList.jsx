import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CupoContext } from "../../context/Cupo/CupoContext";
import DayList from "../../components/DayList";

function CuposListPage() {
  const { loadCupos, cupos, error, deleteCupo } = useContext(CupoContext); // Usamos el contexto
  const [selectedDay, setSelectedDay] = useState("");
  const daysWeek = [1, 2, 3, 4, 5, 6];

  const getDayName = (dayNumber) => {
    const dayNames = {
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
    };
    return dayNames[dayNumber] || "día no válido";
  };

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

  const handleDelete = (idEsquema) => {
    console.log(idEsquema);
    deleteCupo(idEsquema);
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
              {getDayName(day)} {/* Mostrar el nombre del día aquí */}
            </li>
          ))}
        </ul>
      </div>

      {selectedDay && (
        <div className="mt-6">
          <DayList
            day={getDayName(selectedDay)} // Aquí pasamos el nombre del día
            cupos={cupos.filter((cupo) => cupo.diaSemana === selectedDay)}
            navigate={navigate}
            onClick={handleDelete}
            getDayName={getDayName} // Pasamos la función como prop
          />
        </div>
      )}
    </div>
  );
}

export default CuposListPage;
