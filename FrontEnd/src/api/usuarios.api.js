import axiosInstance from "./axiosInstance";
import axios from "axios";

export const Rol_logIn = async (usuario) => {
  try {
    const response = await axios.post("http://localhost:3000/api/users/login", usuario); //coloar la ip de la maquina donde se esta ejecutando el backend
    return response;
  } catch (error) {
    return error;
  }
};
export const createUser = async (usuario) => {
  try {
    const response = await axiosInstance.post("/users", usuario);
    return response;
  } catch (error) {
    return error;
  }
};

export const usuariosConMembresia = async (codMembresia) => {
  try {
    const response = await axiosInstance.get(
      `/users/membresia/${codMembresia}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getCliente = async (dni) => {
  try {
    const response = await axiosInstance.get(`/users/${dni}`);
    return response;
  }
    catch (error) {
        return error;
    }
};
