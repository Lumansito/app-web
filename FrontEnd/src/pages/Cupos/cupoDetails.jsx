import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCupos } from "../../context/Cupo/CupoProvider";

function CupoDetailPage() {
  const { id } = useParams();
  const { getCupo } = useCupos();
  const [cupo, setCupo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCupo = async () => {
      try {
        const data = await getCupo(id);
        setCupo(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCupo();
  }, [id, getCupo]);

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Error</h1>
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!cupo) {
    return (
      <div className="min-h-screen bg-white text-black p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Detalles del Cupo</h1>
      <div className="max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden p-4">
        <p className="text-lg font-semibold">Nombre: {cupo.nombre}</p>
        <p className="text-sm text-gray-600">Descripción: {cupo.descripcion}</p>
      </div>
    </div>
  );
}

export default CupoDetailPage;