import axiosInstance from "./axiosInstance";

export const obtenerConfirmacionAsistenciaAPI = async (dniCliente) => {
  try {
    return await axiosInstance.post(
      `/cupoOtorgado/confirmar/${dniCliente}`
    );
    
  } catch (error) {
    return error;
  }
};