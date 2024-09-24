import axiosInstance from "./axiosInstance";

export const getConfirmacionAsitencia = async (dniCliente) => {
  try {
    const response = await axiosInstance.post(`/cupos/confirmar/${dniCliente}`);
    return response.success.data.message;
  } catch (error) {
    return error.response.data.message;
  }
};