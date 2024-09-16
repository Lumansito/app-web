import { CupoContext } from "./CupoContext";
import {
  getCupos,
  getCupoById,
  updateCupoRequest,
  createCupoRequest,
  deleteCupoRequest,
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
  const [cupos, setCupos] = useState([]); //estado local para almacenar cupos
  const [loading, setLoading] = useState(false); //estado para manejar el loading
  const [error, setError] = useState(null); //estado para manejar errores

  const loadCupos = async () => {
    setLoading(true);
    const data = await getCupos();
    if (data) {
      setCupos(data); //se guarda el cupo en esl estado
    } else {
      setError("error al cargar cupo");
    }
    setLoading(false);
  };
  const getCupo = async (id) => {
    setLoading(true);
    const data = await getCupoById(id);
    setLoading(false);
    return data;
  };
  const createCupo = async (cupo) => {
    setLoading(true);
    const newCupo = await createCupoRequest(cupo);
    if (newCupo) {
      setCupos((prev) => [...prev, newCupo]); //actualizo lista
    } else {
      setError("error al crear cupo");
    }
    setLoading(false);
  };
  const updateCupo = async (id, updateCupo) => {
    setLoading(true);
    const updated = await updateCupoRequest(id, updateCupo);
    if (updated) {
      setCupos((prev) => prev.map((cupo) => (cupo.id === id ? updated : cupo))); //actualiza cupo en el estado
    } else {
      setError("error al actualizar cupo");
    }
    setLoading(false);
  };
  const deleteCupo = async (id) => {
    setLoading(true);
    const deleted = await deleteCupoRequest(id);
    if (deleted) {
      setCupos((prev) => prev.filter((cupo) => cupo.id !== id)); //elimino el cupo del estado
    } else {
      setError("error al eliminar cupo");
    }
    setLoading(false);
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
        deleteCupo,
        createCupo,
        getCupo,
        updateCupo,
        error,
      }}
    >
      {children}
    </CupoContext.Provider>
  );
};

export default CupoProvider;
