import axiosInstance from "./axiosInstance";

export const obtenerSeguimientosXdni_codEjercicioAPI = async (dni, codEjercicio) => {
    try {
      return await axiosInstance.get(`/seguimientos/clientes/${dni}/${codEjercicio}`);
      
    } catch (error) {
      return error;
    }
  };

export const obtenerSeguimientosXdniAPI = async (idSeguimiento) => {
    try {
      return await axiosInstance.get(`/seguimientos/${idSeguimiento}`);
      
    } catch (error) {
      return error;
    }
  };

export const actualizarSeguimientoXidAPI = async (id, seguimiento) => {
    try {
      return await axiosInstance.put(`/seguimientos/${id}`, seguimiento);
      
    } catch (error) {
      return error;
    }
  };

export const crearSeguimientoAPI = async (seguimiento) => {
    try {
      return await axiosInstance.post(`/seguimientos`, seguimiento);
      
    } catch (error) {
      return error;
    }
  }

export const eliminarSeguimientoAPI = async (idSeguimiento) => {
    try {
      return await axiosInstance.delete(`/seguimientos/${idSeguimiento}`);
      
    } catch (error) {
      return error;
    }
  };