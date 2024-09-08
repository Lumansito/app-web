import axiosInstance from "./axiosInstance";

export const getSolicitudes = async () => {
    try{
        return await axiosInstance.get("/solicitudes");
    }
    catch (error) {
        return error;
    }
    
}
export const getSolicitud = async (idRutina) => {
    try{
        return await axiosInstance.get(`/solicitudes/${idRutina}`);
    }
    catch (error) {
        return error;
    }
    
}
