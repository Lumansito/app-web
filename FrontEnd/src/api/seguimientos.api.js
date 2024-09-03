import axios from 'axios';

export const getSeguimientos = async (dni, codEjercicio) => {
    return await axios.get(`http://localhost:3000/api/seguimientos/clientes/${dni}/${codEjercicio}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }) ;
}