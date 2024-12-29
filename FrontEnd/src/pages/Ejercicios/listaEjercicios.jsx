import { useState, useEffect } from "react";
import { useEjercicios } from "../../context/Ejercicio/proveedorEjercicio.jsx";
import { FormularioEjercicio } from "../../components/FormularioEjercicio.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Casa } from "../../assets/Iconos/Casa.jsx";

export const ListaEjercicios = () => {
  const {
    ejercicios,
    cargarEjercicios,
    crearEjercicio,
    eliminarEjercicio,
    actualizarEjercicio,
  } = useEjercicios();
  const [newEjercicio, setNewEjercicio] = useState({ nombre: "" });
  const navigate = useNavigate();

  useEffect(() => {
    cargarEjercicios();
  }, []);

  const handleCreateEjercicio = () => {
    if (!newEjercicio.nombre.trim()) {
      toast.error("El nombre del ejercicio no puede estar vacío.");
      return;
    }
    crearEjercicio(newEjercicio)
      .then(() => {
        toast.success("Ejercicio creado exitosamente.");
        setNewEjercicio({ nombre: "" });
      })
      .catch(() => {
        toast.error("Hubo un error al crear el ejercicio.");
      });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="in-h-scree mx-auto p-4 relative">
      
      <button
        onClick={handleGoHome}
        className="absolute top-4 left-4 p-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Ir al inicio"
      >
        <Casa className="h-5 w-5" />
      </button>

      <div className="max-w-md mx-auto mt-12 flex flex-col justify-between items-center mb-6">
       
        <div className="flex items-center ">
          <button
            onClick={handleGoBack}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded hover:bg-gray-300 transition-colors"
          >
            Volver
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mx-4">
            Listado de ejercicios
          </h1>
        </div>

        <div className="flex flex-col mt-4 w-full space-y-4">
          <input
            type="text"
            value={newEjercicio.nombre}
            onChange={(e) =>
              setNewEjercicio({ ...newEjercicio, nombre: e.target.value })
            }
            placeholder="Nombre del ejercicio"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            onClick={handleCreateEjercicio}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Crear Ejercicio
          </button>
        </div>
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
    </div>
  );
};
