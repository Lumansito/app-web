import axiosInstance from "./axiosInstance";

export const obtenerEsquemaCuposAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const obtenerEsquemaCuposXfechaAPI = async (diaSemana) => {
  try {
    const response = await axiosInstance.get(`/esquemaCupos/dia/${diaSemana}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const obtenerCuposOcupadosXidEsquemaAPI = async (idEsquema) => {
  try {
    const response = await axiosInstance.get(`/esquemaCupos/${idEsquema}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const obtenerEsquemaCuposHoyAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos/today");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const crearEsquemaCuposAPI = async (cupo) => {
  try {
    const response = await axiosInstance.post("/esquemaCupos", cupo);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const actualizarEsquemaCuposAPI = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(
      `/esquemaCupos/${idEsquema}`,
      cupo
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const actualizarEstadoCupoAPI = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(
      `/esquemaCupos/${idEsquema}`,
      cupo
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const eliminarEsquemaCuposAPI = async (idEsquema) => {
  try {
    const response = await axiosInstance.delete(`/esquemaCupos/${idEsquema}`);
    return response.data;
  } catch (error) {
    return false;
  }
};
