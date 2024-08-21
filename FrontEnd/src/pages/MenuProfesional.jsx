import { Link } from "react-router-dom"

export function MenuPorfesional()   {
    return (
        <div>
            <h1>Menu Profesional</h1>
            <Link to="../entrenamientos">
            Entrenamientos
            </Link>
            <Link to="../perfil">
            Perfil
            </Link>
        </div>
    )
}