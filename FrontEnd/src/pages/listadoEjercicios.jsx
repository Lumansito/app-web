import { useEffect } from "react";
import { useEjercicios } from "../context/Ejercicio/EjercicioProvider";

export const ListadoEjercicios = () => {
    const { ejercicios, loadEjercicios } = useEjercicios();
    useEffect(() => {
        loadEjercicios();
    }, []);

    console.log(ejercicios);
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
