import { ContextoClases } from "./contextoClases.jsx";
import { useUsuario } from "../Usuario/ProveedorUsuario.jsx";
import { useContext, useState } from "react";
import {
  obtenerClasesHoyAPI,
  obtenerClaseAPI,
  obtenerCupoClaseAPI,
  crearResevaClaseAPI,
  obtenerClaseReservadaXdniAPI,
  cancelarReservaClaseAPI,
} from "../../api/clases.api.js";

export const useClases = () => {
  const context = useContext(ContextoClases);
  if (!context) {
    throw new Error(
      "useClases debe estar dentro del proveedor ProveedorClases"
    );
  }
  return context;
};

const ProveedorClases = ({ children }) => {
  const { dni, comprobarToken } = useUsuario();

  const [clases, setClases] = useState([]);
  const [clase, setClase] = useState(null);
  const [claseReservada, setClaseReservada] = useState(null);

  const cargarClases = async () => {
    try {
      const respuesta = await obtenerClasesHoyAPI();
      const clasesAr = respuesta.data || [];
      setClases(clasesAr);
      if (respuesta.status === 200) {
        return { correcto: true };
      } else {
        return { error: respuesta };
      }
    } catch (error) {
      return { error };
    }
  };

  const cargarClase = async (idClase) => {
    try {
      const { data: claseCarga } = await obtenerClaseAPI(idClase);
      const { data: cupo } = await obtenerCupoClaseAPI(idClase);

      setClase({ ...claseCarga, cuposOcupados: cupo || 0 });

      return { correcto: true };
    } catch (error) {
      return { error };
    }
  };

  const asignarClaseReservada = async () => {
    try {
      comprobarToken();
      const respuesta = await obtenerClaseReservadaXdniAPI(dni);

      if (respuesta.status === 404) {
        return { correcto: false, mensaje: "Clase no encontrada" };
      } else {
        setClaseReservada(respuesta.data[0]);
        return { correcto: true };
      }
    } catch (error) {
      return { error };
    }
  };

  const reservarClase = async (dniInstructor, horaInicio) => {
    try {
      comprobarToken();
      const clase = {
        dniCliente: dni,
        dniInstructor,
        horaInicio,
      };
  
      const respuesta = await crearResevaClaseAPI(clase);
  
      if (respuesta.status === 200) {
        return { correcto: true, datos: respuesta };
      } else {
        return { error: respuesta };
      }
    } catch (error) {
      return { error };
    }
  };

  const cancelarReservasActivas = async () => {
    try {
      const respuesta = await cancelarReservaClaseAPI(dni);
  
      if (respuesta.status === 200) {
        setClaseReservada(null);
        await cargarClases();
        return { correcto: true };
      } else {
        return { error: respuesta };
      }
    } catch (error) {
      return { error };
    }
  };

  return (
    <ContextoClases.Provider
      value={{
        clases,
        cargarClases,
        cargarClase,
        clase,
        reservarClase,
        asignarClaseReservada,
        claseReservada,
        cancelarReservasActivas,
      }}
    >
      {children}
    </ContextoClases.Provider>
  );
};

export default ProveedorClases;
