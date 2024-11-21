import axiosInstance from "./axiosInstance";

export const obtenerEjerciciosAPI = async () => {
  try {
    const response = await axiosInstance.get("/ejercicios");
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerEjerciciosXcodigoEjAPI = async (codEjercicio) => {
    try {
        const response = await axiosInstance.get("/ejercicios/"+codEjercicio);
        return response;
      } catch (error) {
        return error;
      }
};

export const crearEjercicioAPI = async (values) => {
  try {
    const response = await axiosInstance.post("/ejercicios", values);
    return response;
  } catch (error) {
    return error;
  }
};

export const eliminarEjercicioAPI = async (codEjercicio) => {
  try {
    const response = await axiosInstance.delete("/ejercicios/"+codEjercicio);
    return response;
  } catch (error) {
    return error;
  }
}

export const actualizarEjercicioAPI = async (codEjercicio, values) => {
  try {
    const response = await axiosInstance.put("/ejercicios/"+codEjercicio, values);
    return response;
  } catch (error) {
    return error;
  }
}