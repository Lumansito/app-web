import { useState, useEffect } from "react";
import { useEjercicios } from "../../context/Ejercicio/proveedorEjercicio.jsx";
import { FormularioEjercicio } from "../../components/FormularioEjercicio.jsx";
import { useNavigate } from "react-router-dom";

export const ListaEjercicios = () => {
  const {
    ejercicios,
    cargarEjercicios,
    crearEjercicio,
    eliminarEjercicio,
    actualizarEjercicio,
  } = useEjercicios();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newEjercicio, setNewEjercicio] = useState({ nombre: "" });
  const navigate = useNavigate();

  useEffect(() => {
    cargarEjercicios();
  }, []);

  const handleCreateEjercicio = () => {
    crearEjercicio(newEjercicio);
    setIsCreateModalOpen(false);
    setNewEjercicio({ nombre: "" });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="in-h-scree mx-auto p-4 relative">
      {/* Botón de Home */}
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

      <div className="max-w-md mx-auto mt-12 flex flex-col justify-between items-center mb-6">
        {/* Botón de Volver */}
        <div className="flex items-center ">
            <button
          onClick={handleGoBack}
          className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
        >
          ← Volver
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mx-4">Listado de ejercicios</h1>
        </div>
        
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 mt-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Crear Ejercicio
        </button>
      </div>
      <ul className="space-y-4 max-w-md mx-auto mt-12">
        {ejercicios.map((ejercicio) => (
          <li key={ejercicio.codEjercicio}>
            <FormularioEjercicio
              ejercicio={ejercicio}
              onDelete={eliminarEjercicio}
              onEdit={actualizarEjercicio}
            />
          </li>
        ))}
      </ul>

      {/* Modal de Creación */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md max-h-full overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Crear Nuevo Ejercicio
            </h3>
            <div className="mt-2 space-y-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                value={newEjercicio.nombre}
                onChange={(e) => setNewEjercicio({ ...newEjercicio, nombre: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateEjercicio}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
