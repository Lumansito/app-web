import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { useClases } from "../../context/Clases/proveedorClases.jsx";
import { Clase } from "../../components/Clase";
import { Reserva } from "../../components/Reserva";

export const ListClases = () => {
  const { clases, loadClases, setClaseRes, claseReservada, cancelReservasActivas } = useClases();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadClases();
    setClaseRes();
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
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    setShowModal(false);
    cancelReservasActivas();
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                    <Reserva clase={claseReservada} onClick={() => handleOnClickCancelReserva()} />
                  </li>
                )}
                {clases.map((clase) => (
                  <li key={clase.idEsquema}>
                    <Clase clase={clase} onClick={() => handleOnClickClase(clase.idEsquema)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                ¿Realmente quieres cancelar la reserva?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="items-center px-4 py-3 space-x-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleConfirmCancel}
                >
                  Confirmar
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
