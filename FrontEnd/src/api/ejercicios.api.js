import axiosInstance from "./axiosInstance";

export const obtenerEjerciciosAPI = async () => {
  try {
    const response = await axiosInstance.get("/ejercicios");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const obtenerEjerciciosXcodigoEjAPI = async (codEjercicio) => {
  try {
    const response = await axiosInstance.get(`/ejercicios/${codEjercicio}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const crearEjercicioAPI = async (values) => {
  try {
    const response = await axiosInstance.post("/ejercicios", values);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const eliminarEjercicioAPI = async (codEjercicio) => {
  try {
    const response = await axiosInstance.delete(`/ejercicios/${codEjercicio}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const actualizarEjercicioAPI = async (codEjercicio, values) => {
  try {
    const response = await axiosInstance.put(
      `/ejercicios/${codEjercicio}`,
      values
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
