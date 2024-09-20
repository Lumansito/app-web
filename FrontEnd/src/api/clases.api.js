import axiosInstance from "./axiosInstance";

export const getClasesToday = async (sexo,nrodias) => {

    try{
        const response = await axiosInstance.get(`esquema_cupos/today`);
        return response;
    }
    catch (error) {
        return error;
    }
}