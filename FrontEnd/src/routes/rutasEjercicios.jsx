import {Routes, Route} from 'react-router-dom';
import {ListadoEjercicios} from '../pages/listadoEjercicios';
import {ListaEjercicios} from '../pages/Ejercicios/listaEjercicios.jsx';
import ProveedorEjercicio from '../context/Ejercicio/proveedorEjercicio.jsx';

export function rutasEjercicios() {
    return (
        <ProveedorEjercicio>
            <Routes>
                <Route path="/" element={<ListaEjercicios/>}/>
            </Routes>
        </ProveedorEjercicio>
    );
}
