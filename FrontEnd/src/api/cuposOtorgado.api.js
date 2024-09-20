import axiosInstance from "./axiosInstance";

// Obtener todos los cupos
export const getEsquemaCupos = async () => {
  try {
    const response = await axiosInstance.get("/esquema_cupos");
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error fetching cupos:", error);
    throw error; // Lanza el error
  }
};

// Obtener cupo por día de la semana y horario
export const getEsquemaCuposByDate = async (diaSemana, horario) => {
  try {
    const response = await axiosInstance.get(`/esquema_cupos/${diaSemana}/${horario}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error fetching cupo on ${diaSemana} at ${horario}:`, error);
    throw error;
  }
};

// Obtener cupo por idEsquema
export const getEsquemaCuposById = async (idEsquema) => {
  try {
    const response = await axiosInstance.get(`/esquema_cupos/${idEsquema}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error fetching cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};

// Obtener cupos de hoy
export const getEsquemaCuposToday = async () => {
  try {
    const response = await axiosInstance.get("/esquema_cupos/today");
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error fetching cupos for today:", error);
    throw error;
  }
};

// Crear un nuevo cupo
export const createEsquemaRequest = async (cupo) => {
  try {
    const response = await axiosInstance.post("/esquema_cupos", cupo);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error("Error creating new cupo:", error);
    throw error;
  }
};

// Actualizar un cupo por idEsquema
export const updateEsquemaRequest = async (idEsquema, cupo) => {
  try {
    const response = await axiosInstance.put(`/esquema_cupos/${idEsquema}`, cupo);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error updating cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};

// Eliminar un cupo por idEsquema
export const deleteEsquemaRequest = async (idEsquema) => {
  try {
    const response = await axiosInstance.delete(`/esquema_cupos/${idEsquema}`);
    return response.data; // Devolvemos los datos
  } catch (error) {
    console.error(`Error deleting cupo with ID ${idEsquema}:`, error);
    throw error;
  }
};
