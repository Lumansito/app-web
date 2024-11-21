import axiosInstance from "./axiosInstance";

export const obtenerConfirmacionAsistenciaAPI = async (dniCliente) => {
  try {
    const response = await axiosInstance.post(`/cupoOtorgado/confirmar/${dniCliente}`);
    return response.success.data.message;
  } catch (error) {
    return error.response.data.message;
  }
};