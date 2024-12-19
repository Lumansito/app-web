import axiosInstance from "./axiosInstance";

export const obtenerConfirmacionAsistenciaAPI = async (dniCliente) => {
  try {
    const response = await axiosInstance.post(
      `/cupoOtorgado/confirmar/${dniCliente}`
    );
    return response;
  } catch (error) {
    return error;
  }
};