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
    const response = await axiosInstance.get(`/esquemaCupos/${idClase}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerCupoClaseAPI = async (idClase) => {
  try {
    const response = await axiosInstance.get(`/cupoOtorgado/${idClase}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const crearResevaClaseAPI = async (clase) => {
  try {
    const response = await axiosInstance.post("/cupoOtorgado", clase);
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerClaseReservadaXdniAPI = async (dni) => {
  try {
    const response = await axiosInstance.get(`/cupoOtorgado/reservas/${dni}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const cancelarReservaClaseAPI = async (dni) => {
  try {
    const response = await axiosInstance.post(`/cupoOtorgado/cancelar/${dni}`);
    return response;
  } catch (error) {
    return error;
  }
};
