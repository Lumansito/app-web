import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClases } from "../../context/Clases/ProveedorClases.jsx";
import { Clase } from "../../components/Clase.jsx";
import { Casa } from "../../assets/Iconos/Casa.jsx";
import toast from "react-hot-toast";

export const ConfirmarClases = () => {
  const { clase, cargarClase, reservarClase } = useClases();

  const navigate = useNavigate();
  const params = useParams();
  const { idClase } = params;

  useEffect(() => {
    cargarClase(idClase);
  }, [idClase]);

  const handleConfirm = async () => {
    try {
      const response = await reservarClase(clase.dniInstructor, clase.horario);
      console.log(response);
      if (response.correcto) {
        toast.success("Clase reservada con exito");
        navigate("/clases");
      } else {
        toast.error(
          `Error al reservar la clase: ${response.error.response.data.message}`
        );
      }
    } catch (error) {
      toast.error("Error al reservar la clase");
    }
  };

  const handleGoBack = () => {
    navigate("/clases");
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
          <h1 className="text-2xl font-bold">Confirmar Clase</h1>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4">
            {clase ? (
              <Clase clase={clase} />
            ) : (
              <p className="text-center">Cargando...</p>
            )}
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          Confirmar Asistencia
        </button>
      </div>
    </div>
  );
};
