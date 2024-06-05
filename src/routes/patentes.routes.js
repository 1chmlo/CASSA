import Router from "express-promise-router";

import { verify } from "../controllers/patentes.auth.controller.js";
const router = Router();

router.get("/verify", verify);

export default router;
