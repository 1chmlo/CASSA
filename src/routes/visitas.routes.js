import Router from "express-promise-router";
import {
  createVisita,
  deleteVisita,
  getAllVisitas,
  getVisita,
  updateVisita,
  getAllVisitasAdmin,
} from "../controllers/visitas.controller.js";
import { isAuthCasa } from "../middlewares/authCasa.middleware.js";
import { isAuthConserje } from "../middlewares/authConserje.middleware.js";

const router = Router();

//RUTAS PARA VISITAS
router.get("/visitas", isAuthCasa, getAllVisitas); //CASA

router.get("/allvisitas", isAuthConserje, getAllVisitasAdmin); //CASA

router.post("/visitas/id", isAuthCasa, getVisita); //CASA

router.post("/visitas", isAuthCasa, createVisita); //CASA

router.put("/visitas", isAuthCasa, updateVisita); //CASA

router.delete("/visitas", isAuthCasa, deleteVisita); //CASA

export default router;
