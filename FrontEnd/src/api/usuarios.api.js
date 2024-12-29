import axiosInstance from "./axiosInstance";
import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

export const iniciarSesionAPI = async (usuario) => {
  try {
    return  await axios.post(APIURL + "/users/login", usuario); //coloar la ip de la maquina donde se esta ejecutando el backend
    
  } catch (error) {
    return error;
  }
};

export const crearUsuarioAPI = async (usuario) => {
  try {
    return  await axiosInstance.post("/users", usuario);
    
  } catch (error) {
    return error;
  }
};

export const usuariosConMembresiaAPI = async (codMembresia) => {
  try {
    return  await axiosInstance.get(
      `/users/membresia/${codMembresia}`
    );
    
  } catch (error) {
    return error;
  }
};

export const obtenerClienteXdniAPI = async (dni) => {
  try {
    return  await axiosInstance.get(`/users/${dni}`);
    
  }
  catch (error) {
    return error;
  }
};

export const obtenerProfesionalesAPI = async () => {
  try {
    return  await axiosInstance.get('/users/profesionales'); 
    
    
  } catch (error) {
    return error
  }
};

export const obtenerUsuariosAPI = async () => {
  try {
    return  await axiosInstance.get('/users');
    
  } catch (error) {
    return error;
  }
};

export const eliminarUsuarioAPI = async (dni) => {
  try {
    return  await axiosInstance.delete(`/users/${dni}`);
    
  } catch (error) {
    return error;
  }
};

export const actualizarUsuarioAPI = async (dni, usuario) => {
  try {
    return  await axiosInstance.put(`/users/${dni}`, usuario);
    
  } catch (error) {
    return error;
  }
}

