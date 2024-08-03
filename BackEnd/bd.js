import { createPool } from "mysql2/promise";
import config from "dotenv"

config.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbPort = process.env.DB_PORT;


export const pool = createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: "gimnasio",
});