import { ContextoUsuario } from "./ContextoUsuario.jsx";
import {
  iniciarSesionAPI,
  obtenerProfesionalesAPI,
  obtenerClienteXdniAPI,
} from "../../api/usuarios.api.js";
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

  const iniciarSesion = async (usuario) => {
    try {
      const { data } = await iniciarSesionAPI(usuario);
      if (!data) {
        throw new Error("Error al iniciar sesión");
      }
      const token = data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setRol(decoded.rol);
      setDni(decoded.dni);
      return { correcto: true };
    } catch (error) {
      return { error: error?.message || "Error al iniciar sesión" };
    }
  };

  const comprobarToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
        } else {
          setRol(decoded.rol);
          setDni(decoded.dni);
        }
      } catch (error) {
        localStorage.removeItem("token");
      }
    } else {
      setRol([]);
      setDni();
    }
  };

  const obtenerProfesionales = async () => {
    setLoading(true);
    try {
      const response = await obtenerProfesionalesAPI();
      if (response.data) {
        setProfesionales(response.data);
      }
    } catch (error) {
      setError("Error al cargar profesionales");
      console.error("Error al cargar profesionales:", error);
    } finally {
      setLoading(false);
    }
  };
  const cerrarSesion = async () => {
    setDni();
    localStorage.removeItem("token");
    setRol([]);
  };

  const obtenerDatosPersonales = async () => {
    if (!dni || dni === "") {
      return;
    }
    try {
      const { data } = await obtenerClienteXdniAPI(dni);
      if (!data) {
        return;
      }
      if (!data.fechaPago) {
        data.fechaPago = "No se ha realizado el pago";
      } else {
        const fechaPago = new Date(data.fechaPago);
        const fechaVencimiento = new Date(fechaPago);
        fechaVencimiento.setDate(fechaPago.getDate() + 30);
        data.fechaPago = fechaVencimiento.toLocaleDateString();
      }
      data.membresia =
        data.codMembresia === "1"
          ? "Standard"
          : data.codMembresia === "2"
          ? "Premium"
          : "VIP";

      setDatosUsuario(data);
      return { correcto: true };
    } catch (error) {
      return { error };
    }
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
        obtenerDatosPersonales,
      }}
    >
      {children}
    </ContextoUsuario.Provider>
  );
};

export default ProveedorUsuario;
