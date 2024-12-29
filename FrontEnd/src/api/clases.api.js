import axiosInstance from "./axiosInstance";

export const obtenerClasesHoyAPI = async () => {
  try {
    return await axiosInstance.get("/esquemaCupos/today");
   
  } catch (error) {
    return error; 
  }
};

export const obtenerClaseAPI = async (idClase) => {
  try {
    return await axiosInstance.get(`/esquemaCupos/${idClase}`);
    
  } catch (error) {
    return error;
  }
};

export const obtenerCupoClaseAPI = async (idClase) => {
  try {
    return await axiosInstance.get(`/cupoOtorgado/${idClase}`);
    
  } catch (error) {
    return error;
  }
};

export const crearResevaClaseAPI = async (clase) => {
  try {
    return await axiosInstance.post("/cupoOtorgado", clase);
    
  } catch (error) {
    return error;
  }
};

export const obtenerClaseReservadaXdniAPI = async (dni) => {
  try {
    return await axiosInstance.get(`/cupoOtorgado/reservas/${dni}`);
    
  } catch (error) {
    return error;
  }
};

export const cancelarReservaClaseAPI = async (dni) => {
  try {
    return await axiosInstance.post(`/cupoOtorgado/cancelar/${dni}`);
    
  } catch (error) {
    return error;
  }
};
