import React, { useState } from "react";

function DayList({ day, cupos, navigate, onClick }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCupoId, setSelectedCupoId] = useState(null);

  const handleDeleteCupo = (idEsquema) => {
    setSelectedCupoId(idEsquema); // Guarda el ID del cupo seleccionado
    setShowModal(true); // Muestra el modal
  };

  const handleConfirmDelete = () => {
    if (selectedCupoId) {
      onClick(selectedCupoId); // Llama a la función deleteCupo
      setShowModal(false); // Cierra el modal
    }
  };

  const handleEditCupo = (idEsquema) => {
    navigate(`/cupos/edit/${idEsquema}`); // Redirige a la página de edición
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Cupos para {day}</h1>
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <ul className="p-4 space-y-4">
          {cupos.map((cupo) => (
            <li
              key={cupo.idEsquema}
              className="flex justify-between items-center bg-gray-200 p-2 rounded-lg shadow"
            >
              <div>
                <span className="font-semibold">{cupo.horario}</span> -{" "}
                <span>{cupo.dniInstructor}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCupo(cupo.idEsquema)}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCupo(cupo.idEsquema)} // Asegúrate de que esto llame a la función de eliminación
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate(`/cupos/new/${day}`)}
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
          >
            Agregar nuevo cupo
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                ¿Realmente quieres eliminar este cupo?
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="items-center px-4 py-3 space-x-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleConfirmDelete}
                >
                  Confirmar
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none"
                  onClick={() => setShowModal(false)}
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
}

export default DayList;
