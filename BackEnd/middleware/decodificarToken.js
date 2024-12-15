import jwt from 'jsonwebtoken';

import config from "dotenv"

config.config();

const CLAVE_SUPER_SEGURA = process.env.CLAVE;
const decodificarToken = (req, res, next) => {
  let data = null;
  let token = null;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    token = authHeader.split(" ")[1]; 
  }

  req.session = { rol: null };

  try {
    data = jwt.verify(token, CLAVE_SUPER_SEGURA);
    req.session.rol = data.rol;
  } catch (e) {
    req.session.rol = null;
  }

  next();
};

export default decodificarToken;
