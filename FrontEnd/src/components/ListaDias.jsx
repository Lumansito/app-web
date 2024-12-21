import React, { useState } from "react";
import Switch from "react-switch";
import toast from "react-hot-toast";

function ListaDias({ day, cupos, navigate, onClick, onToggleDisabled }) {
  const handleDeleteCupo = (idEsquema) => {
    toast((t) => (
      <div className="flex flex-col items-start">
        <p className="text-sm text-gray-800">
          ¿Estás seguro de que quieres eliminar este cupo?
        </p>
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => {
              onClick(idEsquema);
              toast.dismiss(t.id);
              toast.success("Cupo eliminado con éxito");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
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

  const handleSwitchChange = (cupo) => {
    onToggleDisabled(cupo);
  };

  const handleEditCupo = (idEsquema) => {
    navigate(`/cupos/edit/${idEsquema}`);
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
                  onClick={() => handleDeleteCupo(cupo.idEsquema)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors text-sm"
                >
                  Eliminar
                </button>
                <Switch
                  type="checkbox"
                  checked={cupo.estado === "habilitado"}
                  onChange={() => handleSwitchChange(cupo)}
                  offColor="#888"
                  onColor="#4CAF50"
                  className="react-switch"
                />
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
    </div>
  );
}

export default ListaDias;