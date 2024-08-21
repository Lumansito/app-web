import axios from 'axios';

export const Rol_logIn = async (usuario) => {
    return await axios.post("http://localhost:3000/api/users/login", usuario );
}

export const createUser = async (usuario) => {
    return await axios.post("http://localhost:3000/api/users", usuario );
}
