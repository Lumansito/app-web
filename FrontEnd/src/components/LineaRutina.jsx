export function LineaRutina({ linea }) {
  return (
    <div className="LineaRutina">
      <p>Ejercicio: {linea.nombre}</p>
      <p>Series: {linea.series}</p>
      <p>Repeticiones: {linea.repeticiones}</p>
    </div>
  );
}
