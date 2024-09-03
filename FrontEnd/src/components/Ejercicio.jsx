export function Ejercicio({ejercicio, onClick}) {
    return (
        <div className="Ejercicio" onClick={onClick} style={{backgroundColor: "blue"}}>
            <p>{ejercicio.nombre}</p>
        </div>
    )
}