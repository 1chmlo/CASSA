import Router from "express-promise-router";
import { verifyImage, upload } from "../controllers/verify.controller.js";

const router = Router();

// Utiliza el middleware de multer definido en el controlador
router.post("/verify", upload.single("image"), verifyImage);

export default router;
