import { Router } from "express";
import { configHandler } from "../handler/confighandler.js";

const router = Router();
router.get("/getconfig", configHandler);

export default router;