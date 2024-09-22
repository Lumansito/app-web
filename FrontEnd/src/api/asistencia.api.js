import axiosInstance from "./axiosInstance";

export const getConfirmacionAsitencia = async () => {
  try {
    const response = await axiosInstance.get(`esquema_cupos/today`);
    return response;
  } catch (error) {
    return error;
  }
};