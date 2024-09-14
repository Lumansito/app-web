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

export const uploadRutinaApi = async (  idRutina, diasRutina, dni) => {
    try{
        return await axiosInstance.put(`/solicitudes/${idRutina}`, {data:diasRutina, dniProf:dni});
    }
    catch (error) {
        return error;
    }
    
}
