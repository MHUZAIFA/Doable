import express from "express";
import {
  startChatSession,
  handleUserMessage,
  finalizeRecommendation,
} from "../controllers/chatBotController";

const router = express.Router();

router.post("/start", startChatSession);
router.post("/message", handleUserMessage);
router.post("/finalize", finalizeRecommendation);

export default router;
