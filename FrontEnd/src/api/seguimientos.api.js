import axiosInstance from "./axiosInstance";


export const getSeguimientos = async (dni, codEjercicio) => {
    try {
      const response = await axiosInstance.get(`/seguimientos/clientes/${dni}/${codEjercicio}`);
      return response;
    } catch (error) {
      return null;
    }
  };
