import axios from 'axios';

export const getEjercicios = async () => {
    return await axios.get('http://localhost:3000/ejercicios');
}

