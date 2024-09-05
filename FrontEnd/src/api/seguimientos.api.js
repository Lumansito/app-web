import axiosInstance from "./axiosInstance";


export const getSeguimientos = async (dni, codEjercicio) => {
    try {
      const response = await axiosInstance.get(`/seguimientos/clientes/${dni}/${codEjercicio}`);
      return response;
    } catch (error) {
      return null;
    }
  };


export const getSeguimientoByid = async (idSeguimiento) => {
    try {
      const response = await axiosInstance.get(`/seguimientos/${idSeguimiento}`);
      return response;
    } catch (error) {
      return null;
    }
  };

export const updateSeguimiento = async (id, seguimiento) => {
    try {
      const response = await axiosInstance.put(`/seguimientos/${id}`, seguimiento);
      return response;
    } catch (error) {
      return null;
    }
  };