import Router from "express-promise-router";
import { verifyImage, upload } from "../controllers/verify.controller.js";
import { isAuthConserje } from "../middlewares/authConserje.middleware.js";

const router = Router();

// Utiliza el middleware de multer definido en el controlador
router.post("/verify", isAuthConserje, upload.single("image"), verifyImage); //CONSERJE

export default router;
