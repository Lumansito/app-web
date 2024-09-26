import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< Updated upstream
  baseURL: 'http://localhost:3000/api', //coloar la ip de la maquina donde se esta ejecutando el backend
=======
  baseURL: "http://localhost:3000/api", //coloar la ip de la maquina donde se esta ejecutando el backend
>>>>>>> Stashed changes
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token no válido o expirado");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
