import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://192.168.100.8:3000/api', 
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opcional: Configurar un interceptor para las respuestas
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores, como un token expirado
    if (error.response && error.response.status === 401) {
      // Manejar el caso en que el token no sea válido
      console.log('Token no válido o expirado');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
