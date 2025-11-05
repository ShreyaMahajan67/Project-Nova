import { Router } from "express";
import * as eventsController from "../controllers/eventsController";

const router = Router();

router.get("/", eventsController.getEvents);
router.post("/", eventsController.createEvent);
router.delete("/:id", eventsController.deleteEvent);

export default router;