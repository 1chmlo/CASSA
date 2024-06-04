import Router from "express-promise-router";
import {
  createAuto,
  deleteAuto,
  getAllAutos,
  getAuto,
  updateAuto,
  
} from "../controllers/autos.controller.js";

const router = Router();

router.get("/autos", getAllAutos);

router.get("/autos/:patente", getAuto);

router.post("/autos", createAuto);

router.put("/autos/:patente", updateAuto);

router.delete("/autos/:patente", deleteAuto);



export default router;
