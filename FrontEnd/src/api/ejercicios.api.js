import axiosInstance from "./axiosInstance";

export const getEjercicios = async () => {
  try {
    const response = await axiosInstance.get("/ejercicios");
    return response;
  } catch (error) {
    return error;
  }
};

export const getEjercicio = async (codEjercicio) => {
    try {
        const response = await axiosInstance.get("/ejercicios");
        return response;
      } catch (error) {
        return error;
      }
};
