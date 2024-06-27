import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { pool } from "./db.js";
import visitasRoutes from "./routes/visitas.routes.js";
import authRoutes from "./routes/auth.routes.js";
import autosRoutes from "./routes/autos.routes.js";
import casasRoutes from "./routes/casas.routes.js";
import verifyRoutes from "./routes/verify.routes.js";
const app = express();
const httpServer = http.createServer(app);
// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.resolve("uploads")));

// Crea un servidor de socket.io y pasa el servidor HTTP
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Exporta io para usarlo en otros archivos
export { io };

// RUTAS
app.get("/", (req, res) => res.json({ message: "que pasa mi gente" }));
app.use("/api", authRoutes);
app.use("/api", visitasRoutes);
app.use("/api", autosRoutes);
app.use("/api", casasRoutes);
app.use("/api", verifyRoutes);
app.get("/api/ingresospermitidos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ingreso WHERE isPermitido = true"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    res.status(500).send("Error fetching data from PostgreSQL");
  }
});
app.get("/api/ingresosnopermitidos", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ingreso WHERE isPermitido = false"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    res.status(500).send("Error fetching data from PostgreSQL");
  }
});
app.post("/api/ingreso", async (req, res) => {
  const { patente, ispermitido } = req.body;
  const result = await pool.query(
    "INSERT INTO INGRESO (fecha_ingreso, patente, ispermitido) VALUES (NOW(), $1, $2) RETURNING *",
    [patente, ispermitido]
  );
  res.json(result.rows[0]);
});

// Ruta para verificar la matrícula

// MANEJADOR DE ERRORES
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default httpServer;
