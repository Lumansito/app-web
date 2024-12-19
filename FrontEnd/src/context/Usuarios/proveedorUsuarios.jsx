import { useContext, useState } from "react";
import { ContextoUsuarios } from "./ContextoUsuarios.jsx";

import { obtenerUsuariosAPI, crearUsuarioAPI, eliminarUsuarioAPI, actualizarUsuarioAPI } from "../../api/usuarios.api.js";

export const useUsuarios = () => {
    const context = useContext(ContextoUsuarios);
    if (!context) {
      throw new Error(
        "useEjercicios debe estar dentro del proveedor UsuariosProvider"
      );
    }
    return context;
  };

const ProveedorUsuarios = ({ children }) => {


    const [usuarios, setUsuarios] = useState([]);


    async function cargarUsuarios() {
      const response = await obtenerUsuariosAPI();
      if (response.status !== 200) {
        console.error("Error al cargar usuarios");
        return;
      }
      setUsuarios(response.data);
    };


    const eliminarUsuario = async (dni) => {
      try {
        await eliminarUsuarioAPI(dni);
        cargarUsuarios();
      } catch (error) {}
    };
  
    const crearUsuario = async (values) => {
      try {
        await crearUsuarioAPI(values);
        cargarUsuarios();
      } catch (error) {
        console.log(error);
      }
    };
  
    const actualizarUsuario = async (dni, usuario) => {
      try {
        await actualizarUsuarioAPI(dni, usuario);
        cargarUsuarios();
      } catch (error) {
        console.log(error);
      }
    };


    return (
        <ContextoUsuarios.Provider
          value={{
            cargarUsuarios,
            usuarios,
            crearUsuario,
            eliminarUsuario,
            actualizarUsuario
            
            
          }}
        >
          {children}
        </ContextoUsuarios.Provider>
      );
}
export default ProveedorUsuarios;