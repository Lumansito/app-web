import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAsistencia } from "../context/Asitencia/ProveedorAsistencia.jsx";
import toast from "react-hot-toast";

export const Asistencia = () => {
  const [dni, setDni] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { confirmAsistencia } = useAsistencia();


  const handleSearch = async () => {
    if (!dni.trim()) {
      toast.error("Ingrese un DNI");
      return;
    }
    setIsLoading(true);
    try {
      const response = await confirmAsistencia(dni);
      if (response.error) {
        toast.error(response.error.response.data.message);
      } else {
        toast.success("Asistencia confirmada");
        setDni("");
      }
    } catch (error) {
      toast.error("Error al confirmar la Asistencia");
    } finally {
      setIsLoading(false);
    }
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
        className="absolute top-4 left-4 px-4 py-2 bg-gray-200 text-black rounded-full hover:bg-gray-300 transition-colors"
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
          <h1 className="text-2xl font-bold">Confirmar asistencia</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Ingrese el DNI"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  DNI
                </label>
                <span className="text-gray-500 sm:text-sm mr-2">DNI</span>
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 disabled:bg-gray-400"
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
