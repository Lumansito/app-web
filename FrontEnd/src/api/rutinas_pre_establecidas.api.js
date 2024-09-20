import axiosInstance from "./axiosInstance";

export const getRutinas_pre_establecidasBySexoNroDias = async (sexo,nrodias) => {

    try{
        const response = await axiosInstance.get(`rutinas_pre_establecidas/${sexo}/${nrodias}`);
        return response;
    }
    catch (error) {
        return error;
    }
}