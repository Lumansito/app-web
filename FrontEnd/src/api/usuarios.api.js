import axios from 'axios';

const token = localStorage.getItem('token'); // Obtén el token del localStorage


export const Rol_logIn = async (usuario) => {
    return await axios.post("http://localhost:3000/api/users/login", usuario );
}

export const createUser = async (usuario) => {
    return await axios.post("http://localhost:3000/api/users", usuario );
}

export const usuariosConMembresia = async (codMembresia) => {
    return await axios.get(`http://localhost:3000/api/users/membresia/${codMembresia}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }) ;
}