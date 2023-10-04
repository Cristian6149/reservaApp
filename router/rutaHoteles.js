import { Router } from "express";
import setters from "../controllers/setHotel.js";
const router = Router();

setters(router);

export default router;