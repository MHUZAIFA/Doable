import { Router } from "express";
import {
  createItinerary,
  generateItinerary,
  saveItinerary,
} from "../controllers/ItenaryController";

const router = Router();

router.post("/generate-itinerary", generateItinerary);
router.post("/save", saveItinerary);
router.post("/create", createItinerary);

export default router;
