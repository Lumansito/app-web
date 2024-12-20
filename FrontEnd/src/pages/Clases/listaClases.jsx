import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClases } from "../../context/Clases/ProveedorClases.jsx";
import { Clase } from "../../components/Clase.jsx";
import { Reserva } from "../../components/Reserva.jsx";
import toast from "react-hot-toast";

export const ListaClases = () => {
  const {
    clases,
    cargarClases,
    asignarClaseReservada,
    claseReservada,
    cancelarReservasActivas,
  } = useClases();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const respuesta = await cargarClases();
      asignarClaseReservada();
      if (respuesta.error) {
        const mensajeError = respuesta.error.response?.data?.message || "Error desconocido al cargar las clases";
      toast.error(mensajeError);
      } 
    };
    cargar();
  }, []);
  

  const handleGoBack = () => {
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleOnClickClase = (idClase) => {
    navigate(`/clases/${idClase}`);
  };

  const handleOnClickCancelReserva = () => {
    toast((t) => (
      <div className="flex flex-col items-start">
        <p>¿Estás seguro de que quieres cancelar la reserva?</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              cancelarReservasActivas();
              toast.dismiss(t.id);
              toast.success('Reserva cancelada con éxito');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
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
          <h1 className="text-2xl font-bold">Listado de Clases</h1>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            {clases.length === 0 ? (
              <p className="text-center text-gray-600">
                No hay clases disponibles
              </p>
            ) : (
              <ul className="space-y-4">
                {claseReservada && (
                  <li>
                    <Reserva
                      clase={claseReservada}
                      onClick={() => handleOnClickCancelReserva()}
                    />
                  </li>
                )}
                {clases.map((clase) => (
                  <li key={clase.idEsquema}>
                    <Clase
                      clase={clase}
                      onClick={() => handleOnClickClase(clase.idEsquema)}
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
