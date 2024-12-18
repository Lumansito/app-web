import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRutinas } from "../../context/Rutinas/ProveedorRutinas.jsx";
import { useUsuario } from "../../context/Usuario/ProveedorUsuario.jsx";
import { Solicitud } from "../../components/Solicitud";

export const ListadoSolicitudes = () => {
  const { cargarSolicitudes, solicitudes } = useRutinas();
  const { comprobarToken } = useUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    comprobarToken();
    cargarSolicitudes();
  }, []);

  const handleSelect = (solicitud) => {
    navigate(`/rutinas/solicitudes/${solicitud.idRutina}`, { replace: false });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
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
      <div className="max-w-md mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold">Solicitudes de Rutina</h1>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {solicitudes.length === 0 ? (
              <p className="text-center text-gray-600">No hay solicitudes</p>
            ) : (
              <ul className="space-y-4">
                {solicitudes.map((sol) => (
                  <li key={sol.idRutina}>
                    <Solicitud
                      solicitud={sol}
                      onClick={() => handleSelect(sol)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
