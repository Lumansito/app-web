import {Routes, Route, Link} from "react-router-dom";
import ProveedorSeguimiento from "../context/Seguimiento/proveedorSeguimiento.jsx";
import {useUsuario} from "../context/Usuario/proveedorUsuario.jsx";
import {ListadoClientesSeguimiento} from "../pages/Seguimiento/listadoClientesSeguimiento.jsx";
import {FormularioSeguimiento} from "../pages/Seguimiento/formularioSeguimiento.jsx";
import {Validacion} from "./Validacion.jsx";

export function RutasSeguimientos() {
    const {rol} = useUsuario();

    return (
        <ProveedorSeguimiento>
            <Validacion rol={rol} esperado={2}>
                <Routes>
                    <Route path="/edit/:idSeguimiento" element={<FormularioSeguimiento/>}/>
                    <Route path="/new/:dni/:codEjercicio" element={<FormularioSeguimiento/>}/>
                    <Route path="/lista/:dni/:codEjercicio" element={<ListadoClientesSeguimiento/>}/>
                    <Route path="/lista/:dni" element={<ListadoClientesSeguimiento/>}/>
                    <Route path="/lista" element={<ListadoClientesSeguimiento/>}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>


                </Routes>
            </Validacion>
        </ProveedorSeguimiento>
    );
}

