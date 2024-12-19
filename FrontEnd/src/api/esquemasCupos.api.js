import axiosInstance from "./axiosInstance";

export const obtenerEsquemaCuposAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos");
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerEsquemaCuposXfechaAPI = async (diaSemana) => {
  try {
    const response = await axiosInstance.get(`/esquemaCupos/dia/${diaSemana}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerCuposOcupadosXidEsquemaAPI = async (idEsquema) => {
  try {
    const response = await axiosInstance.get(`/esquemaCupos/${idEsquema}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerEsquemaCuposHoyAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos/today");
    return response;
  } catch (error) {
    return error;
  }
};

export const crearEsquemaCuposAPI = async (cupo) => {
  try {
    const response = await axiosInstance.post("/esquemaCupos", cupo);
    return response;
  } catch (error) {
    return error;
  }
};

export const actualizarEsquemaCuposAPI = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(
      `/esquemaCupos/${idEsquema}`,
      cupo
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const actualizarEstadoCupoAPI = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(
      `/esquemaCupos/${idEsquema}`,
      cupo
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const eliminarEsquemaCuposAPI = async (idEsquema) => {
  try {
    const response = await axiosInstance.delete(`/esquemaCupos/${idEsquema}`);
    return response;
  } catch (error) {
    return error;
  }
};
