import axios from 'axios';


export const getSeguimientos = async (dni, codEjercicio) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/seguimientos/clientes/${dni}/${codEjercicio}`);
        return response;
    } catch (error) {
        
        return null;
    }
}