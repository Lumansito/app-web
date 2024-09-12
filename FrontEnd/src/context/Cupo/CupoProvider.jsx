import { CupoContext } from "./cupoContext";
import {
  getCupos,
  getCupoById,
  updateCupoRequest,
  createCupoRequest,
  deleteCupoRequest,
} from "../../api/cuposOtorgado.api";
import { useContext, useState } from "react";

export const useCupos = () => {
  //este warning aca no lo entiendo
  const context = useContext(CupoContext);
  if (!context) {
    throw new Error("useCupos debe estar dentro del proveedor CupoProvider");
  }
  return context;
};

const CupoProvider = ({ children }) => {
  const [cupos, setCupos] = useState([]);
  const [error, setError] = useState(null);

  async function loadCupos() {
    try {
      const response = await getCupos();
      setCupos(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  const deleteCupo = async (id) => {
    try {
      if (!window.confirm("¿Estás seguro de eliminar el cupo?")) {
        return;
      }
      await deleteCupoRequest(id);
      setCupos(cupos.filter((cupo) => cupo.id !== id));
    } catch (error) {
      alert("Error al eliminar Cupo");
      console.log(error);
    }
  };

  const createCupo = async (values) => {
    try {
      const response = await createCupoRequest(values);
      setCupos([...cupos, response.data]); // crea un array con los datos del array original?
    } catch (error) {
      console.log(error);
    }
  };

  const getCupo = async (id) => {
    try {
      const response = await getCupoById(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCupo = async (id, values) => {
    try {
      const response = await updateCupoRequest(id, values);
      setCupos(cupos.map((cupo) => (cupo.id === id ? response.data : cupo)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CupoContext.Provider
      value={{
        cupos,
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
