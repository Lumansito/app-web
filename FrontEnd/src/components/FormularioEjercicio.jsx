import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TachoBasura } from '../assets/Iconos/TachoBasura';

export function FormularioEjercicio({ ejercicio, onEdit, onDelete }) {
  const [nombre, setNombre] = useState(ejercicio.nombre);

  const handleEdit = () => {
    onEdit(ejercicio.codEjercicio, { nombre });
    toast.success('Ejercicio actualizado con éxito');
  };

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col items-start">
        <p>¿Estás seguro de que quieres eliminar este ejercicio?</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              onDelete(ejercicio.codEjercicio);
              toast.dismiss(t.id);
              toast.success('Ejercicio eliminado con éxito');
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

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-gray-800">{ejercicio.nombre}</p>
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
          <TachoBasura className="h-5 w-5" />  
          </button>
        </div>
      </div>
      <div className="mt-3">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre del ejercicio
        </label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      
      {nombre !== ejercicio.nombre && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
}
