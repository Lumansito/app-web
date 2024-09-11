import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCupos } from "../context/Cupo/CupoProvider.jsx";


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
    return <div>Error: {error}</div>;
  }

  if (!cupo) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalles del Cupo</h1>
      <p>Nombre: {cupo.nombre}</p>
      <p>Descripción: {cupo.descripcion}</p>
    </div>
  );
}

export default CupoDetailPage;