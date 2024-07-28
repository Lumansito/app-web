import express from "express";
import usersRouter from "./routes/usuarios.routes.js";
import ejerciciosRouter from "./routes/ejercicios.routes.js";
import membresiasRouter from "./routes/membresias.routes.js";
import rutinas_pre_establecidasRouter from "./routes/rutinas_pre_establecidas.routes.js";
import esquema_cuposRouter from "./routes/esquema_cupos.routes.js";
import cors from "cors";


const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json()); //para usar json en el body
app.use(usersRouter);
app.use(membresiasRouter);
app.use(ejerciciosRouter);
app.use(rutinas_pre_establecidasRouter);
app.use(esquema_cuposRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
