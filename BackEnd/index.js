import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import {ProfesionalAdmin } from "./middleware/authorizeRole.js";
import decodificarToken from "./middleware/decodificarToken.js";
import manejoErroresGlobal from "./middleware/manejoErroresGlobal.js";

import usersRouter from "./routes/usuarios.routes.js";
import ejerciciosRouter from "./routes/ejercicios.routes.js";
import membresiasRouter from "./routes/membresias.routes.js";
import rutinas_pre_establecidasRouter from "./routes/rutinasPreestablecidas.routes.js";
import esquema_cuposRouter from "./routes/esquemaCupos.routes.js";
import pagosRouter from "./routes/pagos.routes.js";
import seguimientosRouter from "./routes/seguimientos.routes.js";
import cuposRouter from "./routes/cupoOtorgado.routes.js";
import loginRouter from "./routes/login.routes.js";
import rutinasRouter from "./routes/rutinas.routes.js";


const app = express();
const PORT = 3000;
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //para usar json en el body



app.use(decodificarToken);


//Validamos los roles necesarios para cada conjutno de rutas,
// en el caso de tener distintos roles para un mismo conjunto de rutas,
// se ha validado en cada ruta internamente.
app.use(cuposRouter);
app.use(esquema_cuposRouter);
app.use(loginRouter);
app.use(usersRouter);
app.use(membresiasRouter);
app.use(ejerciciosRouter);
app.use(ProfesionalAdmin, rutinas_pre_establecidasRouter);
app.use(ProfesionalAdmin, rutinasRouter);
app.use(pagosRouter);
app.use(ProfesionalAdmin, seguimientosRouter);

app.use(manejoErroresGlobal);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
