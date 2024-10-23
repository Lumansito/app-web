import {Routes, Route} from "react-router-dom";

import ProveedorClases from "../context/Clases/proveedorClases.jsx";
import {useUsuario} from "../context/Usuario/proveedorUsuario.jsx";

import {ListaClases} from "../pages/Clases/listaClases.jsx";
import {ConfirmarClases} from "../pages/Clases/confirmarClases.jsx";

import {validacion} from "./validacion.jsx";

export function rutasClases() {
    const {rol} = useUsuario();

    return (
        <ProveedorClases>
            <validacion rol={rol} esperado={1}>
                <Routes>
                    <Route path="/" element={<ListaClases/>}/>
                    <Route path="/:idClase" element={<ConfirmarClases/>}/>
                </Routes>
            </validacion>
        </ProveedorClases>
    );
}
