import axiosInstance from "./axiosInstance";

export const getCupos = async () => {
  try {
    const response = await axiosInstance.get("/cupos");
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error fetching cupos:", error);
    return null;
  }
};

export const getCupoById = async (idCupo) => {
  try {
    const response = await axiosInstance.get(`/cupos/${idCupo}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error fetching cupo with ID ${idCupo}:`, error);
    return null;
  }
};

export const updateCupoRequest = async (id, cupo) => {
  try {
    const response = await axiosInstance.put(`/cupos/${id}`, cupo);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error updating cupo with ID ${id}:`, error);
    return null;
  }
};

export const createCupoRequest = async (cupo) => {
  try {
    const response = await axiosInstance.post(`/cupos`, cupo);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error creating new cupo:", error);
    return null;
  }
};

export const deleteCupoRequest = async (idCupo) => {
  try {
    const response = await axiosInstance.delete(`/cupos/${idCupo}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error deleting cupo with ID ${idCupo}:`, error);
    return null;
  }
};
