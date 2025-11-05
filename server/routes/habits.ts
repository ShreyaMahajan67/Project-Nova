import { Router } from "express";
import * as habitsController from "../controllers/habitsController";

const router = Router();

router.get("/", habitsController.getHabits);
router.post("/", habitsController.createHabit);
router.put("/:id/toggle", habitsController.toggleHabit);
router.delete("/:id", habitsController.deleteHabit);

export default router;