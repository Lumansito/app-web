import axiosInstance from "./axiosInstance";

export const obtenerRutinaPreestablecidaXsexo_nroDiasAPI = async (sexo, nrodias) => {

    try{
        return await axiosInstance.get(`rutinas_pre_establecidas/${sexo}/${nrodias}`);
       
    }
    catch (error) {
        return error;
    }
}