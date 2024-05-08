import express from "express";
import  router  from "./routes/users.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json())//para uasr json en el body
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
