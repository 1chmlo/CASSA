import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  port: 5432,
  host: "localhost",
  password: "1234",
  user: "postgres",
  database: "cassadb",
});
pool.on("connect", () =>
  console.log("Conexion establecida con la base de datos")
);
