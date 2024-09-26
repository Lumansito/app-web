import { ClasesContext } from "./ClasesContext.jsx";
import { useUsuario } from "../Usuario/UsuarioProvider.jsx";
import React, { useContext, useState } from "react";
import {
  getClasesToday,
  getClase,
  getCupoClase,
  postClase,
  getClaseReservada,
  cancelarReserva,
} from "../../api/clases.api";

export const useClases = () => {
  const context = useContext(ClasesContext);
  if (!context) {
    throw new Error("useClases debe estar dentro del proveedor ClasesProvider");
  }
  return context;
};

const ClasesProvider = ({ children }) => {
  const { dni, comprobarToken } = useUsuario();

  const [clases, setClases] = useState([]);
  const [clase, setClase] = useState(null);
  const [claseReservada, setClaseReservada] = useState(null);

  const loadClases = async () => {
    try {
      const response = await getClasesToday();
      const clasesAr = response.data || [];
      
      setClases(clasesAr);
    } catch (error) {
      console.error("Error al cargar las clases:", error);
    }
  };

  const loadClase = async (idClase) => {
    try {
      const { data: claseCarga } = await getClase(idClase);
      const { data: cupo } = await getCupoClase(idClase);
      setClase({ ...claseCarga, cuposOcupados: cupo || 0 });
    } catch (error) {
      console.error("Error al cargar la clase:", error);
    }
  };

  const setClaseRes = async () => {
    try {
      comprobarToken();
      const response = await getClaseReservada(dni);
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

      const response = await postClase(clase);

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

  const cancelReservasActivas = async () => {
    const response = await cancelarReserva(dni);
    if (response.status === 200) {
      setClaseReservada(null);
      loadClases();
    } else {
      console.error("Error al cancelar la reserva:", response);
    }
  };

  return (
    <ClasesContext.Provider
      value={{
        clases,
        loadClases,
        loadClase,
        clase,
        reservarClase,
        setClaseRes,
        claseReservada,
        cancelReservasActivas,
      }}
    >
      {children}
    </ClasesContext.Provider>
  );
};

export default ClasesProvider;
