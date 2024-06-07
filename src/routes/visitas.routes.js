import Router from "express-promise-router";
import {
  createVisita,
  deleteVisita,
  getAllVisitas,
  getVisita,
  updateVisita,
} from "../controllers/visitas.controller.js";
import { isAuthCasa } from "../middlewares/authCasa.middleware.js";

const router = Router();

//RUTAS PARA VISITAS
router.get("/visitas", isAuthCasa, getAllVisitas); //CASA

router.get("/visitas/:id", isAuthCasa, getVisita); //CASA

router.post("/visitas", isAuthCasa, createVisita); //CASA

router.put("/visitas/:id", isAuthCasa, updateVisita); //CASA

router.delete("/visitas/:id", isAuthCasa, deleteVisita); //CASA

export default router;
