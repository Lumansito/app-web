import axiosInstance from "./axiosInstance";

export const getClasesToday = async () => {

    try{
        const response = await axiosInstance.get(`esquema_cupos/today`);
        return response;
    }
    catch (error) {
        return error;
    }
}
export const getCuposOcupados = async () => {
    try{
        const response = await axiosInstance.get("cupos");
        return response;
    }
    catch (error) {
        return error;
    }
}