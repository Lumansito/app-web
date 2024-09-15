import { useEffect } from "react";
import { useCupos } from "../../context/Cupo/cupoProvider";
import { useNavigate } from "react-router-dom";

function CuposListPage() {
  const { cupos, error, loadCupos } = useCupos();
  const navigate = useNavigate();

  useEffect(() => {
    loadCupos();
  }, [loadCupos]);

  return (
    <div>
      <h1>Cupos Disponibles</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {cupos.map((cupo) => (
            <li key={cupo.id} onClick={() => navigate(`/cupos/${cupo.id}`)}>
              {cupo.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CuposListPage;
