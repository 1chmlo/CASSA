import Router from "express-promise-router";
import {
  createVisita,
  deleteVisita,
  getAllVisitas,
  getVisita,
  updateVisita,
} from "../controllers/visitas.controller.js";

const router = Router();

router.get("/visitas", getAllVisitas);

router.get("/visitas/:id", getVisita);

router.post("/visitas", createVisita);

router.put("/visitas/:id", updateVisita);

router.delete("/visitas/:id", deleteVisita);

export default router;
