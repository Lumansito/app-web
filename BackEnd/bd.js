import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "192.168.100.8",
  port: 3305,
  user: "root",
  password: "1qw23er4",
  database: "gimnasio",
});