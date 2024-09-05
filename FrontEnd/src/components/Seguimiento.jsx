import { Link } from "react-router-dom";

export function Seguimiento({seguimiento}) {

    const fechaOriginal = new Date(seguimiento.fechaSeguimiento);
    const fecha = fechaOriginal.toISOString().split('T')[0];

    
    const hora = fechaOriginal.toISOString().split('T')[1].split('.')[0];
    return (
        <div className="Seguimiento"  style={{backgroundColor: "red"}}>
            
            <p>Fecha: {fecha}</p>
            <p>Hora: {hora}</p>
            <p>Repeticiones: {seguimiento.repeticiones}</p>
            <p>Peso: {seguimiento.peso}</p>
            <Link to={`/seguimiento/edit/${seguimiento.idSeguimiento}`}>EDITAR</Link>
        </div>
    )
}