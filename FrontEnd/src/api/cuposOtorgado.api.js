import axiosInstance from "./axiosInstance";

export const getCupos = async () => {
  try {
    const response = await axiosInstance.get("/cupos");
    return response;
  } catch (error) {
    return null;
  }
};

export const getCupoById = async (idCupo) => {
  try {
    const response = await axiosInstance.get(`/cupos/${idCupo}`);
    return response;
  } catch (error) {
    return null;
  }
};

export const updateCupoRequest = async (id, cupo) => {
  try {
    const response = await axiosInstance.put(`/cupos/${id}`, cupo);
    return response;
  } catch (error) {
    return null;
  }
};

export const createCupoRequest = async (cupo) => {
  try {
    const response = await axiosInstance.post(`/cupos`, cupo);
    return response;
  } catch (error) {
    return null;
  }
};

export const deleteCupoRequest = async (idCupo) => {
  try {
    const response = await axiosInstance.delete(`/cupos/${idCupo}`);
    return response;
  } catch (error) {
    return null;
  }
};