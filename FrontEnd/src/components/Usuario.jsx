import { useState } from 'react';
import toast from 'react-hot-toast';
import { OcultarContraseña } from '../assets/Iconos/OcultarContraseña';
import { MostrarContraseña } from '../assets/Iconos/MostrarContraseña';
import { Editar } from '../assets/Iconos/Editar';
import { TachoBasura } from '../assets/Iconos/TachoBasura';

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
              <OcultarContraseña className="h-5 w-5" />
            ) : (
              <MostrarContraseña className="h-5 w-5" />
            )}
          </button>
        </div>
        <p className="mt-2 text-gray-500">Roles: {obtenerRoles(usuario.roles)}</p>

        <div className="mt-4 flex space-x-2">
          <button 
            onClick={handleEditar} 
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300 flex items-center"
          >
            <Editar className="h-5 w-5 mr-2" />
            Editar
          </button>
          <button 
            onClick={() => handleEliminar()} 
            className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300 flex items-center"
          >
            <TachoBasura className="h-5 w-5 mr-2" />
            Eliminar
          </button>
        </div>
      </div>
  
    </div>
  );
}
