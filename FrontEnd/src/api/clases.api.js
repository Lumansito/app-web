import axiosInstance from "./axiosInstance";

export const getClasesToday = async () => {
  try {
    const response = await axiosInstance.get(`esquema_cupos/today`);
    return response;
  } catch (error) {
    return error;
  }
};
export const getCuposOcupados = async () => {
  try {
    const response = await axiosInstance.get("cupos");
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { data: [] };
    }
    return { data: [], error: "Error desconocido" };
  }
};

export const getClase = async (idClase) => {
  try {
    const response = await axiosInstance.get(`esquema_cupos/${idClase}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCupoClase = async (idClase) => {
  try {
    const response = await axiosInstance.get(`/cupos/${idClase}`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Clase no encontrada, retornando 0 cupos.");
      return { data: 0 };
    } else {
      console.error("Error al obtener los cupos:", error);
      return { data: 0 };
    }
  }
};

export const postClase = async (clase) => {
  try {
    const response = await axiosInstance.post(`cupos`, clase);
    return response;
  } catch (error) {
    return (error.response.data.message);
  }
};
