export function LineaRutina({linea}) {
    return (
        <div>
            <p>Ejercicio: {linea.nombre}</p>
            <p>Series: {linea.series}</p>
            <p>Repeticiones: {linea.repeticiones}</p>
        </div>
    )
}