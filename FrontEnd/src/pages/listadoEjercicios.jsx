import {getEjercicios} from '../api/ejercicios.api';
import React, { useEffect, useState } from 'react';

export const ListadoEjercicios = () => {

    const [ejercicios, setEjercicios] = useState([]);
    useEffect(() => {
        const fetchEjercicios = async () => {
            const response = await getEjercicios()
            setEjercicios(response.data);
            console.log(response);
        }
        fetchEjercicios();
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
