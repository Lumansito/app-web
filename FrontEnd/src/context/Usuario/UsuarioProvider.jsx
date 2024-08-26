import { UsuarioContext } from "./UsuarioContext.jsx";
import {Rol_logIn} from '../../api/usuarios.api';
import React, { useContext, useState } from 'react';
import { jwtDecode } from "jwt-decode"





export const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if (!context) {
      throw new Error(
        "useEjercicios debe estar dentro del proveedor UsuariosProvider"
      );
    }
    return context;
  };
  
  const UsuarioProvider = ({ children }) => {
    //proveedor para acceder a los datos de los empleados desde cualquier componente
    
    const [rol, setRol] = useState([]);
  
    async function login(usuario) {
        const response = await Rol_logIn(usuario);
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        setRol(decodedToken.rol);
    }

    return (
      <UsuarioContext.Provider
        value={{ rol,setRol, login}}>
        {children}
      </UsuarioContext.Provider>
    );
  };
  
export default UsuarioProvider;