import { Router } from "express";
import * as moodsController from "../controllers/moodsController";

const router = Router();

router.get("/", moodsController.getMoods);
router.post("/", moodsController.createMood);
router.get("/latest", moodsController.getLatestMood);

export default router;