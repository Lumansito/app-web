import { useState, useEffect } from "react";

function CuposList() {
  const [cupos, setCupos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCupos = async () => {
      try {
        const response = await fetch("/api/cuposOtorgado"); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCupos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCupos();
  }, []);

  return (
    <div>
      <h1>Cupos Disponibles</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {cupos.map((cupo) => (
            <li key={cupo.id}>{cupo.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CuposList;