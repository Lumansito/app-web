import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useRutinas } from "../../context/Rutinas/RutinasProvider";
import { useUsuario } from "../../context/Usuario/UsuarioProvider";

import { Solicitud } from "../../components/Solicitud";

export const ListadoSolicitudes = () => {
  const { loadSolicitudes, solicitudes } = useRutinas();
  const { comprobarToken } = useUsuario();
  const navigate = useNavigate();

  useEffect(() => {
    comprobarToken();
    loadSolicitudes();
  }, []);

  const handleSelect = (solicitud) => {
    navigate(`/rutinas/solicitudes/${solicitud.idRutina}`, { replace: false });
  };

  return (
    <div className="flex flex-col  gap-1">
      <h1 className="mb-36">Solicitudes de Rutina </h1>
      {solicitudes.length === 0 && <p>No hay solicitudes</p>}
      <ul className="bg-gris-acero self-center ">
        {solicitudes.map((sol) => (
          <li key={sol.idRutina}>
            <Solicitud solicitud={sol} onClick={() => handleSelect(sol)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
