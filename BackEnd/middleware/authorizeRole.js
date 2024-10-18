// middleware/authorizeRole.js
export const authorizeRole = (requiredRoles) => {
  return (req, res, next) => {
    const userRoles = req.session.rol;
    console.log(userRoles);
    if (!userRoles) {
      return res
        .status(401)
        .json({ message: "No autorizado. Token inválido o inexistente." });
    }
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }

    const isAuthorized = userRoles.some((role) => requiredRoles.includes(role));

    if (!isAuthorized) {
      return res.status(403).json({
        message: `Acceso denegado. Se requiere el rol: ${requiredRoles}.`,
      });
    }
    next();
  };
};


export const professorAdmin = authorizeRole([2, 3]);
