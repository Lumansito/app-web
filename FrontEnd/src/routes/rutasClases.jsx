import {Routes, Route} from "react-router-dom";

import ProveedorClases from "../context/Clases/proveedorClases.jsx";
import {useUsuario} from "../context/Usuario/proveedorUsuario.jsx";

import {ListaClases} from "../pages/Clases/listaClases.jsx";
import {ConfirmarClases} from "../pages/Clases/confirmarClases.jsx";

import {Validacion} from "./Validacion.jsx";

export function RutasClases() {
    const {rol} = useUsuario();

    return (
        <ProveedorClases>
            <Validacion rol={rol} esperado={1}>
                <Routes>
                    <Route path="/" element={<ListaClases/>}/>
                    <Route path="/:idClase" element={<ConfirmarClases/>}/>
                </Routes>
            </Validacion>
        </ProveedorClases>
    );
}
