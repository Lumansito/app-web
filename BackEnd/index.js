import express from "express";
import usersRouter from "./routes/users.routes.js";
import membresiasRouter from "./routes/membresias.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json()); //para usar json en el body
app.use(usersRouter);
app.use(membresiasRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
