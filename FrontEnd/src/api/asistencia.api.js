import axiosInstance from "./axiosInstance";

export const obtenerConfirmacionAsistenciaAPI = async (dniCliente) => {
  try {
    const response = await axiosInstance.post(
      `/cupoOtorgado/confirmar/${dniCliente}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};