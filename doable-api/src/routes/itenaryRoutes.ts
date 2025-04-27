import { Router } from "express";
import { generateItinerary } from "../controllers/ItenaryController";

const router = Router();

router.post("/generate-itinerary", generateItinerary);

export default router;
