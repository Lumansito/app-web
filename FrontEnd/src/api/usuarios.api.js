import axiosInstance from "./axiosInstance";
import axios from "axios";

export const iniciarSesionAPI = async (usuario) => {
  try {
    const response = await axios.post("http://localhost:3000/api/users/login", usuario); //coloar la ip de la maquina donde se esta ejecutando el backend
    return response;
  } catch (error) {
    return error;
  }
};

export const crearUsuarioAPI = async (usuario) => {
  try {
    const response = await axiosInstance.post("/users", usuario);
    return response;
  } catch (error) {
    return error;
  }
};

export const usuariosConMembresiaAPI = async (codMembresia) => {
  try {
    const response = await axiosInstance.get(
      `/users/membresia/${codMembresia}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const obtenerClienteXdniAPI = async (dni) => {
  try {
    const response = await axiosInstance.get(`/users/${dni}`);
    return response;
  }
  catch (error) {
    return error;
  }
};

export const obtenerProfesionalesAPI = async () => {
  try {
    const response = await axiosInstance.get('/users/profesionales'); //const response = await axios.get('/users/profesionales');
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener los profesionales:', error);
    throw error;
  }
};

export const obtenerUsuariosAPI = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
};