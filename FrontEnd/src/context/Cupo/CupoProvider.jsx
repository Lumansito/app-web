import { CupoContext } from "./cupoContext";
import { getCupos } from "../../api/cuposOtorgado.api";
import { useContext, useState } from 'react';

export const useCupos = () => {
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
      // Lógica para eliminar el cupo
    } catch (error) {
      alert("Error al eliminar Cupo");
      console.log(error);
    }
  };

  const createCupo = async (values) => {
    try {
      // Lógica para crear un nuevo cupo
    } catch (error) {
      console.log(error);
    }
  };

  const getCupo = async (id) => {
    try {
      // Lógica para obtener un cupo por ID
    } catch (error) {
      console.log(error);
    }
  };

  const updateCupo = async (id) => {
    try {
      // Lógica para actualizar un cupo
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CupoContext.Provider
      value={{ cupos, loadCupos, deleteCupo, createCupo, getCupo, updateCupo, error }}
    >
      {children}
    </CupoContext.Provider>
  );
};

export default CupoProvider;