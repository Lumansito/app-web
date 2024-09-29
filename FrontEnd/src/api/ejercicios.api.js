import axiosInstance from "./axiosInstance";

export const getEjercicios = async () => {
  try {
    const response = await axiosInstance.get("/ejercicios");
    return response;
  } catch (error) {
    return error;
  }
};

export const getEjercicio = async (codEjercicio) => {
    try {
        const response = await axiosInstance.get("/ejercicios/"+codEjercicio);
        return response;
      } catch (error) {
        return error;
      }
};

export const createEjercicioRequest = async (values) => {
  try {
    const response = await axiosInstance.post("/ejercicios", values);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteEjercicioRequest = async (codEjercicio) => {
  try {
    const response = await axiosInstance.delete("/ejercicios/"+codEjercicio);
    return response;
  } catch (error) {
    return error;
  }
}

export const updateEjercicioRequest = async (codEjercicio, values) => {
  try {
    const response = await axiosInstance.put("/ejercicios/"+codEjercicio, values);
    return response;
  } catch (error) {
    return error;
  }
}