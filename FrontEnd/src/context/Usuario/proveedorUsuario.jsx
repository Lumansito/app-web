import { ContextoUsuario } from "./ContextoUsuario.jsx";
import { iniciarSesionAPI, obtenerProfesionalesAPI , obtenerClienteXdniAPI} from "../../api/usuarios.api.js";
import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useUsuario = () => {
  const context = useContext(ContextoUsuario);
  if (!context) {
    throw new Error(
      "useEjercicios debe estar dentro del proveedor UsuariosProvider"
    );
  }
  return context;
};

const ProveedorUsuario = ({ children }) => {
  

  const [rol, setRol] = useState([]);
  const [dni, setDni] = useState();
  const [datosUsuario, setDatosUsuario] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    comprobarToken();
  }, []);

  async function iniciarSesion(usuario) {
    try {
      const response = await iniciarSesionAPI(usuario);
  
      if (!response.data) {
        throw new Error(response.response.data.message);
      }
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setRol(decoded.rol);
      setDni(decoded.dni);
  
      return response; 
    } catch (error) {
      throw error?.message || "Error al iniciar sesión";
    }
  }
  

  function comprobarToken() {
    if (localStorage.getItem("token")) {
      try {
        const decoded = jwtDecode(localStorage.getItem("token"));
        if (decoded.exp < Date.now() / 1000) {
          console.error("Token expired");
          localStorage.removeItem("token");
        } else {
          setRol(decoded.rol);
          setDni(decoded.dni);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    } else {
      setRol([]);
      setDni();
    }
  }

  const obtenerProfesionales = async () => {
    setLoading(true);
    try {
      const data = await obtenerProfesionalesAPI();
      if (data) {
        setProfesionales(data);
      }
    } catch (error) {
      setError("Error al cargar profesionales");
      console.error("Error al cargar profesionales:", error);
    } finally {
      setLoading(false);
    }
  };

  async function cerrarSesion() {
    setDni();
    localStorage.removeItem("token");
    setRol([]);
  }

  const obtenerDatosPersonales = async () => {
  
    if (!dni || dni === "") {
      return;
    }
    let response = await obtenerClienteXdniAPI(dni);

    if (!response.data) {
      return;
    }
    if(!response.data.fechaPago || response.data.fechaPago === null){
      response.data.fechaPago = "No se ha realizado el pago";
      setDatosUsuario(response.data);
      return;
    }
    const fechaPago = new Date(response.data.fechaPago); // formato ISO 8601
    const fechaVencimiento = new Date(fechaPago);
    fechaVencimiento.setDate(fechaPago.getDate() + 30);
    response.data.fechaPago = fechaVencimiento.toLocaleDateString();
    response.data.membresia = 
      response.data.codMembresia === "1" ? "Standard" : 
      response.data.codMembresia === "2" ? "Premium" : 
      "VIP";

    setDatosUsuario(response.data);
    
  };

  

  return (
    <ContextoUsuario.Provider
      value={{
        rol,
        setRol,
        iniciarSesion,
        comprobarToken,
        dni,
        obtenerProfesionales,
        profesionales,
        cerrarSesion,
        loading,
        error,
        datosUsuario,
        obtenerDatosPersonales
      }}
    >
      {children}
    </ContextoUsuario.Provider>
  );
};

export default ProveedorUsuario;
