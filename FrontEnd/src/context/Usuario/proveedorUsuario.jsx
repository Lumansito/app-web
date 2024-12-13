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
  //proveedor para acceder a los datos de los empleados desde cualquier componente

  const [rol, setRol] = useState([]);
  const [dni, setDni] = useState();
  const [datosUsuario, setDatosUsuario] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    comprobarToken();
  }, []);

  async function iniciarSesion(usuario) {
    const response = await iniciarSesionAPI(usuario);
    const token = response.data.token;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setRol(decoded.rol);
    setDni(decoded.dni);
    
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
