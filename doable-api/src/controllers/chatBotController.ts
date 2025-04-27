import { Request, Response } from "express";
import User from "../models/User";
import Itinerary from "../models/Itenary";
import { chatBasedRecommendation } from "../services/gemini";

interface ChatFilters {
  activityType?: string;
  interest?: string;
  levelOfActivity?: string;
  budget?: string;
  duration?: string;
  travelerPreference?: string;
  accessibility?: string;
  timeOfDay?: string;
  distance?: string;
  location?: string;
}

const chatSessions: Map<string, any> = new Map();

// 👉 Fetch user preferences or history
async function fetchUserPreferenceOrHistory(userId: string) {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  if (user.preferences && user.preferences.length > 0) {
    return {
      source: "preferences",
      data: user.preferences.map((pref) => ({
        category: pref.category,
        type: pref.type,
        name: pref.name || "",
      })),
    };
  } else {
    const itineraries = await Itinerary.find({ userId });
    if (itineraries.length > 0) {
      const activities = itineraries.flatMap(
        (itinerary) => itinerary.activities || []
      );
      return {
        source: "history",
        data: activities.map((activity: any) => ({
          category: activity.type,
          name: activity.title,
          location: activity.address,
        })),
      };
    }
  }

  // No preferences or history
  return {
    source: "popular",
    data: [],
  };
}

// 👉 Build Gemini prompt
function buildPrompt(
  source: string,
  filters: ChatFilters,
  conversationHistory: any[],
  data: any[]
): string {
  let baseInfo = "";

  if (source === "preferences" && data.length > 0) {
    baseInfo = `User Preferences:\n${data
      .map((d, i) => `  ${i + 1}. ${d.category || d.type}: ${d.name}`)
      .join("\n")}`;
  } else if (source === "history" && data.length > 0) {
    baseInfo = `User Past Activities:\n${data
      .map((d, i) => `  ${i + 1}. ${d.name} (${d.category}) at ${d.location}`)
      .join("\n")}`;
  } else {
    baseInfo = `User has no preferences or history.\nFind a popular trending place/activity around ${
      filters.location || "the city"
    }.`;
  }

  return `You are a smart travel recommendation chatbot.

${baseInfo}

User selected filters:
${
  Object.entries(filters)
    .map(([k, v]) => `  - ${k}: ${v}`)
    .join("\n") || "  No specific filters."
}

Conversation so far:
${conversationHistory
  .map(
    (turn) => `${turn.role === "user" ? "User" : "Assistant"}: ${turn.message}`
  )
  .join("\n")}

Instructions:
- Suggest an activity/place based on preferences or location.
- If no preferences/history, suggest a popular trending spot.
- Output ONLY clean JSON format like this:
{
  "title": "...",
  "description": "...",
  "cost": "Free/Low/Premium",
  "duration": "...",
  "location": "...",
  "latitude": 0.0,
  "longitude": 0.0,
  "type": "Outdoor / Indoor / Restaurant / Cafe / Event / Park / Museum / Bar / Historical Site"
}
- Choose type based on activity if possible.
`;
}

// 📍 Start Chat Session
export async function startChatSession(req: Request, res: Response) {
  try {
    const { userId, filters } = req.body;

    const { source, data } = await fetchUserPreferenceOrHistory(userId);

    chatSessions.set(userId, {
      filters: filters || {},
      preferencesOrHistory: data,
      source,
      conversationHistory: [],
      currentTurn: 0,
      maxTurns: 5,
    });

    res.status(200).json({ message: "Chat session started" });
  } catch (error) {
    console.error("Error starting chat session:", error);
    res.status(500).json({ message: "Failed to start chat session" });
  }
}

// 📍 Handle User Message
export async function handleUserMessage(req: Request, res: Response) {
  try {
    const { userId, message } = req.body;
    const session = chatSessions.get(userId);

    if (!session) {
      console.error("Session not found for user:", userId);
      res.status(400).json({ message: "No active session. Start chat first." });
      return;
    }

    session.conversationHistory.push({ role: "user", message });

    const prompt = buildPrompt(
      session.source,
      session.filters,
      session.conversationHistory,
      session.preferencesOrHistory
    );

    console.log("Prompt sending to Gemini:", prompt);

    const suggestion = await chatBasedRecommendation(prompt);

    session.conversationHistory.push({
      role: "assistant",
      message: JSON.stringify(suggestion, null, 2),
    });
    session.currentTurn++;

    const shouldFinalize = session.currentTurn >= session.maxTurns;

    res.status(200).json({ suggestion, shouldFinalize });
  } catch (error: any) {
    console.error("Error handling user message:", error);
    res.status(500).json({ message: "Failed to handle user message" });
  }
}

// 📍 Finalize Recommendation
export async function finalizeRecommendation(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const session = chatSessions.get(userId);

    if (!session) {
      res.status(400).json({ message: "No active session." });
      return;
    }

    const prompt =
      buildPrompt(
        session.source,
        session.filters,
        session.conversationHistory,
        session.preferencesOrHistory
      ) + "\n\nFinalize and recommend only the best place or activity.";

    const finalRecommendation = await chatBasedRecommendation(prompt);

    chatSessions.delete(userId);

    res.status(200).json({ finalRecommendation });
  } catch (error) {
    console.error("Error finalizing recommendation:", error);
    res.status(500).json({ message: "Failed to finalize recommendation" });
  }
}
