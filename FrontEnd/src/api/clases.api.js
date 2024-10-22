import axiosInstance from "./axiosInstance";

export const obtenerClasesHoyAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos/today");
    
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerClaseAPI = async (idClase) => {
  try {
    const response = await axiosInstance.get(`esquemaCupos/${idClase}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerCupoClaseAPI = async (idClase) => {
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

export const crearResevaClaseAPI = async (clase) => {
  try {
    const response = await axiosInstance.post(`cupos`, clase);
    return response;
  } catch (error) {
    return (error.response.data.message);
  }
};

export const obtenerClaseReservadaXdniAPI = async (dni) => {
  try {
    const response = await axiosInstance.get(`/cupos/reservas/${dni}`);
    return response;
  } catch (error) {
    return error;
  }
}

export const cancelarReservaClaseAPI = async (dni) => {
  try {
    const response = await axiosInstance.post(`/cupos/cancelar/${dni}`);
    return response;
  } catch (error) {
    return error;
  }
}