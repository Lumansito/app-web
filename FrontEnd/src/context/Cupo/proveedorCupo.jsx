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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarCupos = async () => {
    setLoading(true);
    try {
      const data = await obtenerEsquemaCuposAPI();
      if (data) {
        setCupos(data);
      }
    } catch (error) {
      setError("Error al cargar cupos");
      console.error("Error al cargar cupos:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarCuposHoy = async () => {
    setLoading(true);
    try {
      const data = await obtenerEsquemaCuposHoyAPI();
      if (data) {
        setCupos(data);
      }
    } catch (error) {
      setError("Error al cargar los cupos de hoy");
      console.error("Error al cargar los cupos de hoy:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarCuposXfecha = async (diaSemana) => {
    setLoading(true);
    try {
      const data = await obtenerEsquemaCuposXfechaAPI(diaSemana); // Solo pasar diaSemana
      return data;
    } catch (error) {
      setError("Error al cargar cupo específico");
      console.error(`Error al obtener el cupo para ${diaSemana}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const cargarCupoXid = async (idEsquema) => {
    setLoading(true);
    try {
      const data = await obtenerCuposOcupadosXidEsquemaAPI(idEsquema);
      return data;
    } catch (error) {
      setError("Error al cargar cupo específico por ID");
      console.error(`Error al obtener el cupo con ID ${idEsquema}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const crearCupo = async (cupo) => {
    setLoading(true);
    try {
      const newCupo = await crearEsquemaCuposAPI(cupo);
      if (newCupo) {
        setCupos((prev) => [...prev, newCupo]);
        return true; // Devuelve true si todo fue exitoso
      }
      return false;
    } catch (error) {
      setError("Error al crear cupo");
      console.error("Error al crear cupo:", error);
      return false; // Devuelve false si hubo un error
    } finally {
      setLoading(false);
    }
  };

  const actualizarCupo = async (idEsquema, cupo) => {
    setLoading(true);
    try {
      const updated = await actualizarEsquemaCuposAPI(idEsquema, cupo);
      if (updated) {
        setCupos((prev) =>
          prev.map((existingCupo) =>
            existingCupo.idEsquema === idEsquema ? updated : existingCupo
          )
        );
        return true;
      }
    } catch (error) {
      setError("Error al actualizar cupo");
      console.error(`Error al actualizar el cupo con ID ${idEsquema}:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDisabled = async (cupo) => {
    const nuevoEstado =
      cupo.estado === "habilitado" ? "deshabilitado" : "habilitado";
    const cupoActualizado = { ...cupo, estado: nuevoEstado };
    try {
      const success = await actualizarCupo(cupo.idEsquema, cupoActualizado);
      if (success) {
        setCupos((prev) =>
          prev.map((existingCupo) =>
            existingCupo.idEsquema === cupo.idEsquema
              ? cupoActualizado
              : existingCupo
          )
        );
        console.log(`Cupo ${cupo.idEsquema} actualizado con éxito`);
      }
    } catch (error) {
      console.error(
        `Error al actualizar el cupo con ID ${cupo.idEsquema}:`,
        error
      );
    }
  };

  const eliminarCupo = async (idEsquema) => {
    setLoading(true);
    try {
      // Pasa idEsquema a la función de solicitud de eliminación
      const deleted = await eliminarEsquemaCuposAPI(idEsquema); // Asegúrate de que esto reciba el ID
      if (deleted) {
        // Actualiza el estado de los cupos eliminando el que tiene el idEsquema correspondiente
        setCupos((prev) => prev.filter((cupo) => cupo.idEsquema !== idEsquema));
      }
    } catch (error) {
      setError("Error al eliminar cupo");
      console.error(`Error al eliminar el cupo con ID ${idEsquema}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCupos();
  }, []);

  return (
    <ContextoCupo.Provider
      value={{
        cupos,
        loading,
        cargarCupos,
        cargarCuposHoy,
        eliminarCupo,
        crearCupo,
        cargarCuposXfecha,
        cargarCupoXid,
        actualizarCupo,
        handleToggleDisabled,
        error,
      }}
    >
      {children}
    </ContextoCupo.Provider>
  );
};

export default ProveedorCupo;
