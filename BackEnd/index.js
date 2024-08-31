import express from "express";
import jwt from "jsonwebtoken";
import usersRouter from "./routes/usuarios.routes.js";
import ejerciciosRouter from "./routes/ejercicios.routes.js";
import membresiasRouter from "./routes/membresias.routes.js";
import rutinas_pre_establecidasRouter from "./routes/rutinas_pre_establecidas.routes.js";
import esquema_cuposRouter from "./routes/esquema_cupos.routes.js";
import pagosRouter from "./routes/pagos.routes.js";
import seguimientosRouter from "./routes/seguimientos.routes.js";
import cuposRouter from "./routes/cupo_otorgado.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //para usar json en el body


    

app.use((req, res, next) => {
  let data = null;
  let token = null;
  const authHeader = req.headers.authorization;
    if (authHeader) {
      token = authHeader.split(' ')[1]; 
    }
  req.session = {rol: null};
  try{
    data = jwt.verify(token, "CLAVE_SUPER_SEGURA");
    req.session.rol = data.rol;
  }catch(e){
    console.log("Error en token");
    req.session.rol = null;
  }
  next();
});

app.use(usersRouter);
app.use(membresiasRouter);
app.use(ejerciciosRouter);
app.use(rutinas_pre_establecidasRouter);
app.use(esquema_cuposRouter);
app.use(pagosRouter);
app.use(seguimientosRouter);
app.use(cuposRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
