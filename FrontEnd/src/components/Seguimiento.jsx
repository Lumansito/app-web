import { Link } from "react-router-dom";
import { useSeguimiento } from "../context/Seguimiento/SeguimientoProvider";

export function Seguimiento({ seguimiento }) {
  const fechaOriginal = new Date(seguimiento.fechaSeguimiento);
  const fecha = fechaOriginal.toISOString().split("T")[0];
  const { borrarSeguimiento } = useSeguimiento();

  const handleDelete = () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este elemento?"
    );
    if (confirmacion) {
      borrarSeguimiento(seguimiento.idSeguimiento);
    }
  };

  return (
    <div className="Seguimiento" style={{ backgroundColor: "red" }}>
      <p>Fecha: {fecha}</p>
      <p>Repeticiones: {seguimiento.repeticiones}</p>
      <p>Peso: {seguimiento.peso}</p>
      <Link to={`/seguimiento/edit/${seguimiento.idSeguimiento}`}>EDITAR</Link>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
}
