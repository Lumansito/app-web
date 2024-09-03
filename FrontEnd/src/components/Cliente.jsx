export function Cliente({cliente, onClick}) {
    return (
        <div className="Cliente" onClick={onClick} style={{border: "1px solid red"}}>
            <p>{cliente.nombre}</p>
            <p>{cliente.apellido}</p>
        </div>
    )
}