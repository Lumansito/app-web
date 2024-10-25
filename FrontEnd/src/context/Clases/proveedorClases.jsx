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
    throw new Error("useClases debe estar dentro del proveedor ProveedorClases");
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
      const response = await obtenerClasesHoyAPI();
      const clasesAr = response.data || [];
      
      setClases(clasesAr);
    } catch (error) {
      console.error("Error al cargar las clases:", error);
    }
  };

  const cargarClase = async (idClase) => {
    try {
      const { data: claseCarga } = await obtenerClaseAPI(idClase);
      const { data: cupo } = await obtenerCupoClaseAPI(idClase);
      setClase({ ...claseCarga, cuposOcupados: cupo || 0 });
    } catch (error) {
      console.error("Error al cargar la clase:", error);
    }
  };

  const asignarClaseReservada = async () => {
    try {
      comprobarToken();
      const response = await obtenerClaseReservadaXdniAPI(dni);
      if (response.status === 404) {
        return null;
      } else {
        setClaseReservada(response.data[0]);
      }
    } catch (error) {
      console.error("Error al obtener la clase reservada:", error);
      return null;
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

      const response = await crearResevaClaseAPI(clase);

      if (response.status === 200) {
        return { success: response };
      } else {
        return { error: response };
      }
    } catch (error) {
      console.error("Error al reservar la clase:", error);
      return "Error al reservar la clase";
    }
  };

  const cancelarReservasActivas = async () => {
    const response = await cancelarReservaClaseAPI(dni);
    if (response.status === 200) {
      setClaseReservada(null);
      cargarClases();
    } else {
      console.error("Error al cancelar la reserva:", response);
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
