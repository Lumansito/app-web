import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CupoContext } from "../../context/Cupo/CupoContext";

function CuposListPage() {
  const { loadCupos, cupos, loading, error } = useContext(CupoContext); // Usamos el contexto
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

  const handleSelect = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <h1 className="text-2xl mb-4">Cupos por Día</h1>

      {error && <p>Error: {error}</p>}
      {loading ? (
        <p>Cargando cupos...</p>
      ) : (
        <>
          {/* Selección de días */}
          <ul className="bg-gris-acero self-center ">
            {daysWeek.map((day) => (
              <li key={day} onClick={() => handleSelect(day)}>
                {day}
              </li>
            ))}
          </ul>

          {/* Listado de cupos según día */}
          {selectedDay && (
            <div className="flex flex-col gap-4  items-center">
              <h2 className="text-gray-600">
                Cupos para {selectedDay}
              </h2>
              <ul className="bg-gris-acero self-center ">
                {cupos
                  .filter((cupo) => cupo.dia === selectedDay)
                  .map((cupo) => (
                    <li key={cupo.id}>
                      <span>{cupo.horaInicio}</span> -{" "}
                      <span>{cupo.profesor}</span>
                      <button
                        onClick={() => navigate(`/cupos/${cupo.id}/edit`)}
                        className="bg-blue-400 rounded-2xl p-1 text-sm mt-4 w-40 mx-auto"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => navigate(`/cupos/${cupo.id}/delete`)}
                        className="bg-blue-400 rounded-2xl p-1 text-sm mt-4 w-40 mx-auto"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
              </ul>

              <button
                onClick={() => navigate(`/cupos/new?dia=${selectedDay}`)}
                className="bg-blue-400 rounded-2xl p-1 text-sm mt-4 w-40 mx-auto"
              >
                Agregar nuevo cupo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CuposListPage;
