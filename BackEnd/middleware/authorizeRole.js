// middleware/authorizeRole.js
export const authorizeRole = (requiredRoles) => {
  return (req, res, next) => {
    const userRoles = req.session.rol;
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
export const ProfesionalAdmin = authorizeRole([2, 3]);
export const Administrador = authorizeRole([3]);
export const Profesional = authorizeRole([2]);
export const Cliente = authorizeRole([1]);
export const TodosLosRoles = authorizeRole([1,2,3]);