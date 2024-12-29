import axiosInstance from "./axiosInstance";

export const obtenerEjerciciosAPI = async () => {
  try {
    return await axiosInstance.get("/ejercicios");
    
  } catch (error) {
    return error;
  }
};

export const obtenerEjerciciosXcodigoEjAPI = async (codEjercicio) => {
  try {
    return await axiosInstance.get(`/ejercicios/${codEjercicio}`);
    
  } catch (error) {
    return error;
  }
};

export const crearEjercicioAPI = async (values) => {
  try {
    return await axiosInstance.post("/ejercicios", values);
    
  } catch (error) {
    return error;
  }
};

export const eliminarEjercicioAPI = async (codEjercicio) => {
  try {
    return await axiosInstance.delete(`/ejercicios/${codEjercicio}`);
    
  } catch (error) {
    return error;
  }
};

export const actualizarEjercicioAPI = async (codEjercicio, values) => {
  try {
    const respuesta = await axiosInstance.put(
      `/ejercicios/${codEjercicio}`,
      values
    );
    return respuesta;
  } catch (error) {
    return error;
  }
};
