import axiosInstance from "./axiosInstance";

// Obtener todos los cupos
export const obtenerEsquemaCuposAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos");
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error fetching cupos:", error);
    throw error; // Lanza el error
  }
};

// Obtener cupo por día de la semana y horario
export const obtenerEsquemaCuposXfechaAPI = async (diaSemana) => {
  const response = await axiosInstance.get(`esquemaCupos/dia/${diaSemana}`);
  return response.data;
};

// Obtener cupo por idEsquema
export const obtenerCuposOcupadosXidEsquemaAPI = async (idEsquema) => {
  try {
    const response = await axiosInstance.get(`/esquemaCupos/${idEsquema}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error fetching cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};

// Obtener cupos de hoy
export const obtenerEsquemaCuposHoyAPI = async () => {
  try {
    const response = await axiosInstance.get("/esquemaCupos/today");
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error fetching cupos for today:", error);
    throw error;
  }
};

// Crear un nuevo cupo
export const crearEsquemaCuposAPI = async (cupo) => {
  try {
    const response = await axiosInstance.post("/esquemaCupos", cupo);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error creating new cupo:", error);
    throw error;
  }
};

// Actualizar un cupo por idEsquema
export const actualizarEsquemaCuposAPI = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(`/esquemaCupos/${idEsquema}`, cupo);
    return response.data;
  } catch (error) {
    console.error(`Error updating cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};

export const actualizarEstadoCupoAPI = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(`/esquemaCupos/estado/${idEsquema}`, cupo);
    return response.data;
  } catch (error) {
    console.error(`Error updating cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};

// Eliminar un cupo por idEsquema
export const eliminarEsquemaCuposAPI = async (idEsquema) => {
  try {
    const response = await axiosInstance.delete(`/esquemaCupos/${idEsquema}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error deleting cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};