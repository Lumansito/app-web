const manejoErroresGlobal = (err, req, res, next) => {
    
    console.error(err); //dejamos el console log para debuggear
    
    const statusCode = err.statusCode || 500; 
    const message = err.message || "Algo salió mal";
  
    res.status(statusCode).json({ message });
  };

export default manejoErroresGlobal;