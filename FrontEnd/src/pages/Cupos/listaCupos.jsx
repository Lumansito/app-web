import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextoCupo } from "../../context/Cupo/ContextoCupo.jsx";
import ListaDias from "../../components/ListaDias.jsx";
import toast from "react-hot-toast";
import { format, parse, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { Casa } from "../../assets/Iconos/Casa.jsx";

function ListaCupos() {
  const { cargarCupos, cupos, setCupos, error, eliminarCupo, actualizarCupo } =
    useContext(ContextoCupo);
  const [selectedDay, setSelectedDay] = useState(null);
  const daysWeek = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate();

  const getDayName = (dayNumber) => {
    const date = new Date(2024, 0, dayNumber);
    return format(date, "EEEE", { locale: es });
  };

  useEffect(() => {
    cargarCupos();
  }, []);

  const handleSelect = (day) => {
    setSelectedDay(day);
  };

  const handleDelete = (idEsquema) => {
    eliminarCupo(idEsquema)
      .then(() => {
        setCupos((prevCupos) =>
          prevCupos.filter((c) => c.idEsquema !== idEsquema)
        );
        toast.success("Cupo eliminado correctamente");
      })
      .catch(() => {
        toast.error("Error al eliminar el cupo");
      });
  };

  const handleToggleDisabled = (cupo) => {
    const updatedCupo = {
      ...cupo,
      estado: cupo.estado === "habilitado" ? "deshabilitado" : "habilitado",
    };

    actualizarCupo(cupo.idEsquema, updatedCupo)
      .then(() => {
        const nuevosCupos = cupos.map((c) =>
          c.idEsquema === cupo.idEsquema
            ? { ...c, estado: updatedCupo.estado }
            : c
        );
        setCupos(nuevosCupos);
        toast.success(
          `Cupo ${
            updatedCupo.estado === "habilitado" ? "habilitado" : "deshabilitado"
          } correctamente`
        );
      })
      .catch(() => {
        toast.error("Error al actualizar el estado del cupo");
      });
  };

  const isMatchingDay = (cupo, day) => {
    try {
     
      const dayFromName = getDay(parseISO(`2024-01-0${day}`));
      
      return dayFromName === cupo.diaSemana;
    } catch {
      return parseInt(cupo.diaSemana) === day;
    }
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
        <Casa className="h-5 w-5" />
      </button>
      <div className="max-w-md mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold">Cupos por Día</h1>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
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
      </div>
      {selectedDay !== null && (
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <ListaDias
            day={getDayName(selectedDay)}
            cupos={cupos.filter((cupo) => isMatchingDay(cupo, selectedDay))}
            navigate={navigate}
            onClick={handleDelete}
            getDayName={getDayName}
            onToggleDisabled={handleToggleDisabled}
          />
        </div>
      )}
    </div>
  );
}

export default ListaCupos;
