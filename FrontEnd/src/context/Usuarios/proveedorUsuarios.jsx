import { useContext, useState } from "react";
import { ContextoUsuarios } from "./ContextoUsuarios.jsx";

import {
  obtenerUsuariosAPI,
  crearUsuarioAPI,
  eliminarUsuarioAPI,
  actualizarUsuarioAPI,
} from "../../api/usuarios.api.js";

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

  const cargarUsuarios = async () => {
    try {
      const response = await obtenerUsuariosAPI();
      if (response.status !== 200) {
        console.error("Error al cargar usuarios");
        return { correcto: false, error: "Error al cargar usuarios" };
      }
      setUsuarios(response.data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const eliminarUsuario = async (dni) => {
    try {
      await eliminarUsuarioAPI(dni);
      await cargarUsuarios();
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const crearUsuario = async (values) => {
    try {
       
     const respuesta= await crearUsuarioAPI(values);
      if(respuesta.status !== 200){
        return {error: error};
      }
      await cargarUsuarios();
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const actualizarUsuario = async (dni, usuario) => {
    try {
      const respuesta = await actualizarUsuarioAPI(dni, usuario);
      if(respuesta.status !== 200){
        return {error: error};
      }
      await cargarUsuarios();
      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  return (
    <ContextoUsuarios.Provider
      value={{
        cargarUsuarios,
        usuarios,
        crearUsuario,
        eliminarUsuario,
        actualizarUsuario,
      }}
    >
      {children}
    </ContextoUsuarios.Provider>
  );
};
export default ProveedorUsuarios;