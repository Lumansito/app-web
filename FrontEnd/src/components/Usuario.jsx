import { useState } from 'react';
import toast from 'react-hot-toast';

export function Usuario({ usuario, eliminar, editar }) {
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar el modal de eliminación

  const obtenerRoles = (rolesArray) => {
    const rolesMap = {
      1: "Cliente",
      2: "Profesional",
      3: "Admin"
    };

    return rolesArray.map(rol => rolesMap[rol] || "Rol desconocido").join(", ");
  };

  const handleEditar = () => {
    editar(usuario);
  };

  const handleEliminar = () => {

    toast((t) => (
      <div className="flex flex-col items-start">
        <p>¿Estás seguro de que quieres eliminar este Usuario?</p>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => {
              eliminar(usuario.dni);
              toast.dismiss(t.id);
              toast.success('Usuario eliminado con éxito');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
    
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Información del Usuario</div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{usuario.nombre} {usuario.apellido}</h2>
        <p className="mt-2 text-gray-500">DNI: {usuario.dni}</p>
        <p className="mt-2 text-gray-500">Fecha de Nacimiento: {usuario.fechaNac}</p>
        <p className="mt-2 text-gray-500">Email: {usuario.mail}</p>
        <p className="mt-2 text-gray-500">Teléfono: {usuario.telefono}</p>
        <p className="mt-2 text-gray-500">Sexo: {usuario.sexo}</p>
        <div className="mt-2 text-gray-500 flex items-center">
          <span>Contraseña: </span>
          <span className="ml-1">{mostrarContrasenia ? usuario.contrasenia : '•'.repeat(usuario.contrasenia.length)}</span>
          <button 
            onClick={toggleMostrarContrasenia}
            className="ml-2 text-indigo-500 hover:text-indigo-700 focus:outline-none"
            aria-label={mostrarContrasenia ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {mostrarContrasenia ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-2 text-gray-500">Roles: {obtenerRoles(usuario.roles)}</p>

        <div className="mt-4 flex space-x-2">
          <button 
            onClick={handleEditar} 
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar
          </button>
          <button 
            onClick={() => handleEliminar()} 
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
  
    </div>
  );
}
