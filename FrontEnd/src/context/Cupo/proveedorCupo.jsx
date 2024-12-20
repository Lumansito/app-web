import { ContextoCupo } from "./ContextoCupo.jsx";
import {
  obtenerEsquemaCuposAPI,
  obtenerEsquemaCuposXfechaAPI,
  obtenerEsquemaCuposHoyAPI,
  obtenerCuposOcupadosXidEsquemaAPI,
  crearEsquemaCuposAPI,
  actualizarEsquemaCuposAPI,
  eliminarEsquemaCuposAPI,
} from "../../api/esquemasCupos.api.js";
import { useContext, useEffect, useState } from "react";

export const useCupos = () => {
  const context = useContext(ContextoCupo);
  if (!context) {
    throw new Error("useCupos debe estar dentro del proveedor ProveedorCupo");
  }
  return context;
};

const ProveedorCupo = ({ children }) => {
  const [cupos, setCupos] = useState([]);
  const [error, setError] = useState(null);

  const cargarCupos = async () => {
    
    try {
      const response = await obtenerEsquemaCuposAPI();
      if (response.data) {
        setCupos(response.data);
      }
    } catch (error) {
      setError("Error al cargar cupos");
      console.error("Error al cargar cupos:", error);
    } 
  };

  const cargarCuposHoy = async () => {
    
    try {
      const data = await obtenerEsquemaCuposHoyAPI();
      if (data) {
        setCupos(data);
      }
    } catch (error) {
      setError("Error al cargar los cupos de hoy");
      console.error("Error al cargar los cupos de hoy:", error);
    } 
  };

  const cargarCuposXfecha = async (diaSemana) => {
    
    try {
      const data = await obtenerEsquemaCuposXfechaAPI(diaSemana); // Solo pasar diaSemana
      console.log("data", data);
      return data;
    } catch (error) {
      setError("Error al cargar cupo específico");
      console.error(`Error al obtener el cupo para ${diaSemana}:`, error);
    } 
  };

  const cargarCupoXid = async (idEsquema) => {
    
    try {
      const response = await obtenerCuposOcupadosXidEsquemaAPI(idEsquema);
      if(response.data) 
        return response.data;
    } catch (error) {
      setError("Error al cargar cupo específico por ID");
      console.error(`Error al obtener el cupo con ID ${idEsquema}:`, error);
    } 
  };

  const crearCupo = async (cupo) => {
    
    try {
      const newCupo = await crearEsquemaCuposAPI(cupo);
      if (newCupo) {
        setCupos((prev) => [...prev, newCupo]);
        return true; 
      }
      return false;
    } catch (error) {
      setError("Error al crear cupo");
      console.error("Error al crear cupo:", error);
      return false; 
    } 
  };

  const actualizarCupo = async (idEsquema, cupo) => {
    
    try {
      console.log("id", idEsquema);
      console.log("lo que se envia", cupo);
      const updated = await actualizarEsquemaCuposAPI(idEsquema, cupo);
      console.log("rta api", updated);
      if (updated) {
        setCupos((prev) =>
          prev.map((existingCupo) =>
            existingCupo.idEsquema === idEsquema
              ? { ...existingCupo, estado: updated.estado }
              : existingCupo
          )
        );
        return true;
      }
    } catch (error) {
      setError("Error al actualizar cupo");
      console.error(`Error al actualizar el cupo con ID ${idEsquema}:`, error);
      return false;
    }
  };

  const eliminarCupo = async (idEsquema) => {
    
    try {
      const deleted = await eliminarEsquemaCuposAPI(idEsquema); 
      if (deleted) {
        setCupos((prev) => prev.filter((cupo) => cupo.idEsquema !== idEsquema));
      }
    } catch (error) {
      setError("Error al eliminar cupo");
      console.error(`Error al eliminar el cupo con ID ${idEsquema}:`, error);
    } finally {
      
    }
  };

  useEffect(() => {
    cargarCupos();
  }, []);

  return (
    <ContextoCupo.Provider
      value={{
        cupos,
        setCupos,
        cargarCupos,
        cargarCuposHoy,
        eliminarCupo,
        crearCupo,
        cargarCuposXfecha,
        cargarCupoXid,
        actualizarCupo,
        error,
      }}
    >
      {children}
    </ContextoCupo.Provider>
  );
};

export default ProveedorCupo;
