import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useRutinas } from "../../context/Rutinas/RutinasProvider";

import { Solicitud } from "../../components/Solicitud";
import { LineaRutinaForm } from "../../components/LineaRutinaForm";

export const FormRutinaSolicitud = () => {
  const { solicitud, loadSolicitud, lineas } = useRutinas();

  const [numeroLineas, setNumeroLineas] = useState(1);
  const navigate = useNavigate();
  const params = useParams();

  const idSolicitud = params.idSolicitud;

  useEffect(() => {
    if (idSolicitud) {
      loadSolicitud(idSolicitud);
      // Asegurarse de que idSolicitud exista antes de intentar cargar la solicitud
    }
  }, []);

  const handleClickButton = () => {
    console.log(lineas);
  };
  const handleAñadir = () => {
    setNumeroLineas((prev) => prev + 1);
  };

  if (!solicitud) {
    return <div>Cargando solicitud...</div>; // Mostrar un indicador de carga mientras se obtiene la solicitud
  }
  return (
    <div>
      <h1>Solicitud de Rutina</h1>
      <Solicitud solicitud={solicitud} modo="descripcion" />
      <Link to="/rutinas/solicitudes">Volver</Link>

      <h2>Lineas de Rutina</h2>
      {Array.from({ length: numeroLineas }, (_, index) => (
        <LineaRutinaForm key={index} index={index} />
      ))}

      <button onClick={handleAñadir}>Añadir otra linea</button>
      <button onClick={handleClickButton}>ENVIAR</button>
    </div>
  );
};
