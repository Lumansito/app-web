import  {useState, useEffect} from "react";
import {useEjercicios} from "../../context/Ejercicio/proveedorEjercicio.jsx";
import {FormularioEjercicio} from "../../components/FormularioEjercicio.jsx";


export const ListaEjercicios = () => {
    const {ejercicios, cargarEjercicios,  crearEjercicio,  eliminarEjercicio,  actualizarEjercicio} = useEjercicios();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newEjercicio, setNewEjercicio] = useState({nombre: ''});

    useEffect(() => {
        cargarEjercicios();
    }, []);

    const handleCreateEjercicio = () => {
        crearEjercicio(newEjercicio);
        setIsCreateModalOpen(false);
        setNewEjercicio({nombre: ''});
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Listado de ejercicios</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Crear Ejercicio
                </button>
            </div>
            <ul className="space-y-4">
                {ejercicios.map(ejercicio => (
                    <li key={ejercicio.codEjercicio}>
                        <FormularioEjercicio ejercicio={ejercicio} onDelete={eliminarEjercicio} onEdit={actualizarEjercicio}/>
                    </li>
                ))}
            </ul>

            {/* Modal de Creación */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Crear Nuevo Ejercicio
                            </h3>
                            <div className="mt-2 space-y-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={newEjercicio.nombre}
                                        onChange={(e) => setNewEjercicio({...newEjercicio, nombre: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    />
                                </div>

                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateEjercicio}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}