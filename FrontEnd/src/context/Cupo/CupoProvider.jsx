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

  const loadCuposByDate = async (diaSemana, horario) => {
    setLoading(true);
    try {
      const data = await getEsquemaCuposByDate(diaSemana, horario);
      return data;
    } catch (error) {
      setError("Error al cargar cupo específico");
      console.error(
        `Error al obtener el cupo para ${diaSemana} a las ${horario}:`,
        error
      );
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
      }
    } catch (error) {
      setError("Error al crear cupo");
      console.error("Error al crear cupo:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCupo = async (idEsquema, diaSemana, horario, updateCupo) => {
    setLoading(true);
    try {
      const updated = await updateEsquemaRequest(diaSemana, horario, updateCupo);
      if (updated) {
        setCupos((prev) =>
          prev.map((cupo) =>
            cupo.diaSemana === diaSemana && cupo.horaInicio === horario
              ? updated
              : cupo
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

  const deleteCupo = async (idEsquema, diaSemana, horario) => {
    setLoading(true);
    try {
      const deleted = await deleteEsquemaRequest(diaSemana, horario);
      if (deleted) {
        setCupos((prev) =>
          prev.filter(
            (cupo) =>
              !(cupo.diaSemana === diaSemana && cupo.horaInicio === horario)
          )
        );
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
