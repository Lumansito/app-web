import { useEffect } from "react";
import { useEjercicios } from "../context/Ejercicio/proveedorEjercicio.jsx";

export const ListadoEjercicios = () => {
    const { ejercicios, cargarEjercicios } = useEjercicios();
    useEffect(() => {
        cargarEjercicios();
    }, []);

    
    return (
        <div>
            <h1>Listado de ejercicios</h1>
            <ul>
                {ejercicios.map(ejercicio => (
                    <li key={ejercicio.codEjercicio}>{ejercicio.nombre}</li>
                ))}
            </ul>
        </div>
    )
}
