import axios from 'axios';

export const getRutinas_pre_establecidasBySexoNroDias = async (sexo,nrodias) => {
    return await axios.get(`http://localhost:3000/api/rutinas_pre_establecidas/${sexo}/${nrodias}`);
}