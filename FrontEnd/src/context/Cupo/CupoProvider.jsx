import { CupoContext } from "./CupoContext";
import {
  getEsquemaCupos,
  getEsquemaCuposByDate,
  getEsquemaCuposToday,
  getEsquemaCuposById,
  createEsquemaRequest,
  updateEsquemaRequest,
  deleteEsquemaRequest,
} from "../../api/cuposOtorgado.api";
import { useContext, useEffect, useState } from "react";

export const useCupos = () => {
  const context = useContext(CupoContext);
  if (!context) {
    throw new Error("useCupos debe estar dentro del proveedor CupoProvider");
  }
  return context;
};

const CupoProvider = ({ children }) => {
  const [cupos, setCupos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCupos = async () => {
    setLoading(true);
    try {
      const data = await getEsquemaCupos();
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

  const loadCuposToday = async () => {
    setLoading(true);
    try {
      const data = await getEsquemaCuposToday();
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

  const loadCuposByDate = async (diaSemana) => {
    setLoading(true);
    try {
      const data = await getEsquemaCuposByDate(diaSemana); // Solo pasar diaSemana
      return data;
    } catch (error) {
      setError("Error al cargar cupo específico");
      console.error(`Error al obtener el cupo para ${diaSemana}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const loadCupoById = async (id) => {
    setLoading(true);
    try {
      const data = await getEsquemaCuposById(id);
      return data;
    } catch (error) {
      setError("Error al cargar cupo específico por ID");
      console.error(`Error al obtener el cupo con ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const createCupo = async (cupo) => {
    setLoading(true);
    try {
      const newCupo = await createEsquemaRequest(cupo);
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

  const updateCupo = async (idEsquema, cupo) => {
    setLoading(true);
    try {
      const updated = await updateEsquemaRequest(idEsquema, cupo);
      if (updated) {
        setCupos((prev) =>
          prev.map((existingCupo) =>
            existingCupo.idEsquema === idEsquema ? updated : existingCupo
          )
        );
      }
    } catch (error) {
      setError("Error al actualizar cupo");
      console.error(`Error al actualizar el cupo con ID ${idEsquema}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCupo = async (idEsquema) => {
    setLoading(true);
    try {
      // Pasa idEsquema a la función de solicitud de eliminación
      const deleted = await deleteEsquemaRequest(idEsquema); // Asegúrate de que esto reciba el ID
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
    loadCupos();
  }, []);

  return (
    <CupoContext.Provider
      value={{
        cupos,
        loading,
        loadCupos,
        loadCuposToday,
        deleteCupo,
        createCupo,
        loadCuposByDate,
        loadCupoById,
        updateCupo,
        error,
      }}
    >
      {children}
    </CupoContext.Provider>
  );
};

export default CupoProvider;
