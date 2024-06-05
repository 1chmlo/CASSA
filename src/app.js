import express from "express";
import morgan from "morgan";

import visitasRoutes from "./routes/visitas.routes.js";
import authRoutes from "./routes/auth.routes.js";
import autosRoutes from "./routes/autos.routes.js";
import casasRoutes from "./routes/casas.routes.js";
import verifyRoutes from "./routes/verify.routes.js";
const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// RUTAS
app.get("/", (req, res) => res.json({ message: "que pasa mi gente" }));
app.use("/api", authRoutes);
app.use("/api", visitasRoutes);
app.use("/api", autosRoutes);
app.use("/api", casasRoutes);
app.use("/api", verifyRoutes);
// Ruta para verificar la matrícula

// MANEJADOR DE ERRORES
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
