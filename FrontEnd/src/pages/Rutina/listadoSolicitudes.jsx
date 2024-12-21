import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRutinas } from "../../context/Rutinas/ProveedorRutinas.jsx";
import { useUsuario } from "../../context/Usuario/ProveedorUsuario.jsx";
import { Solicitud } from "../../components/Solicitud";
import { Casa } from "../../assets/Iconos/Casa.jsx";

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
