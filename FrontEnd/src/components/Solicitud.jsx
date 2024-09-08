export function Solicitud({solicitud, modo, onClick})  {
  
    
    const fechaOriginal = new Date(solicitud.fechaPeticion);
    const fecha = fechaOriginal.toISOString().split("T")[0];
    return (
      <div className="Solicitud" onClick={onClick}>
        <p>Nombre: {solicitud.nombre} {solicitud.apellido}</p>
        {modo === "descripcion" &&  <p>Descripción: {solicitud.peticion}</p>}
        <p>Fecha peticion: {fecha} </p>
      </div>
    );
  }
  