export function Cliente({cliente, onClick}) {
    return (
        <div className="Cliente bg-red-500 rounded-3xl border-2 border-black " onClick={onClick} >
            <p>{cliente.nombre}</p>
            <p>{cliente.apellido}</p>
        </div>
    )
}