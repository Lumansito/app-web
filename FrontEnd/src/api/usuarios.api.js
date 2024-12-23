import axiosInstance from "./axiosInstance";
import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

export const iniciarSesionAPI = async (usuario) => {
  try {
    const response = await axios.post(APIURL + "/users/login", usuario); //coloar la ip de la maquina donde se esta ejecutando el backend
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
    const response = await axiosInstance.get('/users/profesionales'); 
    
    return response;
  } catch (error) {
    return error
  }
};

export const obtenerUsuariosAPI = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response;
  } catch (error) {
    return error;
  }
};

export const eliminarUsuarioAPI = async (dni) => {
  try {
    const response = await axiosInstance.delete(`/users/${dni}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const actualizarUsuarioAPI = async (dni, usuario) => {
  try {
    const response = await axiosInstance.put(`/users/${dni}`, usuario);
    return response;
  } catch (error) {
    return error;
  }
}

