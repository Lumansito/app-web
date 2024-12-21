const manejoErroresGlobal = (err, req, res, next) => {
    
    console.error(err); //dejamos el console log para debuggear
    
    const statusCode = err.statusCode || 500;
     
    const message =  "Algo salió mal, Error en el servidor";
  
    res.status(statusCode).json({ message });
  };

export default manejoErroresGlobal;