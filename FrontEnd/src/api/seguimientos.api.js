import axiosInstance from "./axiosInstance";

export const obtenerSeguimientosXdni_codEjercicioAPI = async (dni, codEjercicio) => {
    try {
      const response = await axiosInstance.get(`/seguimientos/clientes/${dni}/${codEjercicio}`);
      return response;
    } catch (error) {
      return null;
    }
  };

export const obtenerSeguimientosXdniAPI = async (idSeguimiento) => {
    try {
      const response = await axiosInstance.get(`/seguimientos/${idSeguimiento}`);
      return response;
    } catch (error) {
      return null;
    }
  };

export const actualizarSeguimientoXidAPI = async (id, seguimiento) => {
    try {
      const response = await axiosInstance.put(`/seguimientos/${id}`, seguimiento);
      return response;
    } catch (error) {
      return null;
    }
  };

export const crearSeguimientoAPI = async (seguimiento) => {
    try {
      const response = await axiosInstance.post(`/seguimientos`, seguimiento);
      return response;
    } catch (error) {
      return null;
    }
  }

export const eliminarSeguimientoAPI = async (idSeguimiento) => {
    try {
      const response = await axiosInstance.delete(`/seguimientos/${idSeguimiento}`);
      return response;
    } catch (error) {
      return null;
    }
  };