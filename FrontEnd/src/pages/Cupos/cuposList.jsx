import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CupoContext } from "../../context/Cupo/CupoContext";
import DayList from "../../components/DayList";

function CuposListPage() {
  const { loadCupos, cupos, error, deleteCupo } = useContext(CupoContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const daysWeek = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate();

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

  useEffect(() => {
    loadCupos();
  }, []);

  const handleSelect = (day) => {
    setSelectedDay(day);
  };

  const handleDelete = (idEsquema) => {
    deleteCupo(idEsquema);
  };

  const isMatchingDay = (cupo, day) => {
    const dayNamesToNumbers = {
      Lunes: 1,
      Martes: 2,
      Miércoles: 3,
      Jueves: 4,
      Viernes: 5,
      Sábado: 6,
    };

    const cupoDayNumber =
      dayNamesToNumbers[cupo.diaSemana] || parseInt(cupo.diaSemana);

    return cupoDayNumber === day;
  };

  if (error) {
    return <p>Error al cargar los cupos: {error}</p>;
  }

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 relative">
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
      <button
        onClick={handleGoBack}
        className="absolute top-4 right-4 p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Volver"
      >
        ←
      </button>

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
              {getDayName(day)}
            </li>
          ))}
        </ul>
      </div>

      {selectedDay !== null && (
        <div className="mt-6">
          <DayList
            day={getDayName(selectedDay)}
            cupos={cupos.filter((cupo) => isMatchingDay(cupo, selectedDay))}
            navigate={navigate}
            onClick={handleDelete}
            getDayName={getDayName}
          />
        </div>
      )}
    </div>
  );
}

export default CuposListPage;
