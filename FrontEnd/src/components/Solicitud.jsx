export function Solicitud({ solicitud, modo, onClick }) {
  const fechaOriginal = new Date(solicitud.fechaPeticion);
  const fecha = fechaOriginal.toISOString().split("T")[0];
  return (
    <div
    className={`Solicitud p-4 m-10 bg-azul-oscuro rounded-lg shadow-md text-base sm:text-lg md:text-xl lg:text-2xl ${
      modo !== "descripcion" ? "hover:bg-blue-950 cursor-pointer" : ""
    }`}
      onClick={modo !== "descripcion" ? onClick : null}
    >
      <p>
        Nombre: {solicitud.nombre} {solicitud.apellido}
      </p>
      {modo === "descripcion" && <p>Descripción: {solicitud.peticion}</p>}
      <p>Fecha peticion: {fecha} </p>
    </div>
  );
}
