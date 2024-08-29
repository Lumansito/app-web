import { useEffect } from "react";
import { useSeguimiento } from "../context/Seguimiento/SeguimientoProvider";

export const ListadoClientesSeguimiento= () => {
    const { clientes,loadClientesSeguimiento  } = useSeguimiento();
    useEffect(() => {
        loadClientesSeguimiento();
    }, []);

    
    return (
        <div>
            <h1>Listado de Clientes con membresia apta para seguimientos</h1>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.dni}>{cliente.nombre} {cliente.apellido}</li>
                ))}
            </ul>
        </div>
    )
}
