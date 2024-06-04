import Router from "express-promise-router";
import {
  createCasa,
  deleteCasa,
  getAllCasas,
  getCasa,
  updateCasa,
} from "../controllers/casas.controller.js";

const router = Router();

router.get("/casas", getAllCasas);

router.get("/casas/:numero", getCasa);

router.post("/casas", createCasa);

router.put("/casas/:numero", updateCasa);

router.delete("/casas/:numero", deleteCasa);

export default router;
