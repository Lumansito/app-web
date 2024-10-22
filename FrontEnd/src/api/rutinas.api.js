import axiosInstance from "./axiosInstance";

export const obtenerSolicitudesRutinasAPI = async () => {
    try{
        return await axiosInstance.get("/solicitudes");
    }
    catch (error) {
        return error;
    }
    
}

export const obtenerSolicitudRutinaXidRutinaAPI = async (idRutina) => {
    try{
        return await axiosInstance.get(`/solicitudes/${idRutina}`);
    }
    catch (error) {
        return error;
    }
    
}

export const actualizarRutinaAPI = async (idRutina, diasRutina, dni) => {
    try{
        return await axiosInstance.put(`/solicitudes/${idRutina}`, {data:diasRutina, dniProf:dni});
    }
    catch (error) {
        return error;
    }
    
}
