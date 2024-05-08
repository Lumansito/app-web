import { createPool } from "mysql2/promise";

const bd = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gimnasio",
});

export default bd;
