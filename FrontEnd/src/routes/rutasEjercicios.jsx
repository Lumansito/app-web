import {Routes, Route} from 'react-router-dom';
//import {ListadoEjercicios} from '../pages/ListadoEjercicios';
import {ListaEjercicios} from '../pages/Ejercicios/listaEjercicios.jsx';
import ProveedorEjercicio from '../context/Ejercicio/proveedorEjercicio.jsx';

export function RutasEjercicios() {
    return (
        <ProveedorEjercicio>
            <Routes>
                <Route path="/" element={<ListaEjercicios/>}/>
            </Routes>
        </ProveedorEjercicio>
    );
}
