import axiosInstance from "./axiosInstance";

export const obtenerEsquemaCuposAPI = async () => {
  try {
    return  await axiosInstance.get("/esquemaCupos");
    
  } catch (error) {
    return error;
  }
};

export const obtenerEsquemaCuposXfechaAPI = async (diaSemana) => {
  try {
    return  await axiosInstance.get(`/esquemaCupos/dia/${diaSemana}`);
    
  } catch (error) {
    return error;
  }
};

export const obtenerCuposOcupadosXidEsquemaAPI = async (idEsquema) => {
  try {
    return  await axiosInstance.get(`/esquemaCupos/${idEsquema}`);
    
  } catch (error) {
    return error;
  }
};

export const obtenerEsquemaCuposHoyAPI = async () => {
  try {
    return  await axiosInstance.get("/esquemaCupos/today");
    
  } catch (error) {
    return error;
  }
};

export const crearEsquemaCuposAPI = async (cupo) => {
  try {
    return  await axiosInstance.post("/esquemaCupos", cupo);
    
  } catch (error) {
    return error;
  }
};

export const actualizarEsquemaCuposAPI = async (idEsquema, cupo) => {
  try {
    return  await axiosInstance.put(
      `/esquemaCupos/${idEsquema}`,
      cupo
    );
    
  } catch (error) {
    return error;
  }
};

export const actualizarEstadoCupoAPI = async (idEsquema, cupo) => {
  try {
    return  await axiosInstance.put(
      `/esquemaCupos/${idEsquema}`,
      cupo
    );
    
  } catch (error) {
    return error;
  }
};

export const eliminarEsquemaCuposAPI = async (idEsquema) => {
  try {
    return  await axiosInstance.delete(`/esquemaCupos/${idEsquema}`);
    
  } catch (error) {
    return error;
  }
};
