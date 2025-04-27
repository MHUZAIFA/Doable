import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import User from "../models/User";
import Itinerary from "../models/Itenary";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export interface ItineraryFilters {
  startDate: string;
  endDate: string;
  location?: string;
  weather?: string;
  travelerPreference?: string;
  budget?: string;
  accessibility?: string;
}

// Helper to calculate number of days between two dates
function getDateRange(startDateStr: string, endDateStr: string): string[] {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const dates: string[] = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // Keep as YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export async function generateItineraryPlan(
  userId: string,
  filters: ItineraryFilters
) {
  try {
    if (!filters.startDate || !filters.endDate) {
      throw new Error("Start Date and End Date are required");
    }

    const user = await User.findOne({ userId });

    if (!user) {
      throw new Error("User not found.");
    }

    const preferences =
      user.preferences && user.preferences.length > 0 ? user.preferences : null;

    let history: any[] = [];

    if (!preferences) {
      const itineraries = await Itinerary.find({ userId: user._id });

      if (itineraries.length > 0) {
        itineraries.forEach((itinerary) => {
          if (itinerary.activities && itinerary.activities.length > 0) {
            itinerary.activities.forEach((activity: any) => {
              history.push({
                category: activity.type,
                name: activity.name,
                location: activity.address,
              });
            });
          }
        });
      }
    }

    const dateList = getDateRange(filters.startDate, filters.endDate);

    let prompt = `You are a smart AI city travel assistant.

    Your job is to plan a fully structured, exciting, and flexible itinerary for a traveler visiting a city for the first time.
    
    Traveler Context:
    - Trip Dates: ${filters.startDate} to ${filters.endDate}
    - Number of Days: ${dateList.length}
    - Location: ${filters.location || "Not specified"}
    - Weather Forecast: ${filters.weather || "Unknown"}
    - Group Type: ${filters.travelerPreference || "Not specified"}
    - Budget Range: ${filters.budget || "Not specified"}
    - Accessibility Requirements: ${filters.accessibility || "None"}
   
    
    Traveler Preferences:
    ${
      preferences
        ? preferences
            .map(
              (pref, idx) =>
                ` ${idx + 1}. Category: ${pref.category}, Type: ${
                  pref.type
                }, Name: ${pref.name}`
            )
            .join("\n")
        : history.length > 0
        ? history
            .map(
              (item, idx) =>
                `    ${idx + 1}. Name: ${item.name}, Type: ${
                  item.category
                }, Location: ${item.location}`
            )
            .join("\n")
        : " No past history. Recommend popular and trending activities."
    }
    
    Instructions:
    - Build a DAILY itinerary for each day between ${filters.startDate} and ${
      filters.endDate
    }.
    - The plan must start around 8:00 AM with breakfast and flow smoothly until about 10:00-11:00 PM.
    - Allocate realistic estimated times for each activity.
    - Take into account:
      - User's preferences first.
      - Budget limits when suggesting dining or expensive activities.
      - Group type (solo travelers prefer different activities than families).
      - Weather (rain → indoor activities; sun → outdoor experiences).
      - Distance and time needed to travel between places.
    - Suggest:
      - Breakfast place
      - Morning activities
      - Mid-morning café (optional)
      - Lunch spot
      - Afternoon attractions
      - Coffee/Snack break (optional)
      - Dinner location
      - Evening entertainment (optional: bar, event, relaxing walk, etc.)
      - End day with 'return to hotel' suggestion.
    
    - Output a fully structured JSON ARRAY:
    [
      {
        "date": "YYYY-MM-DD",
        "timeline": [
          {
            "time": "08:00 AM",
            "title": "...",
            "description": "...",
            "location": "...",
            "latitude": ...,
            "longitude": ...,
            "estimated_time": "1 hour",
            "category": "Breakfast"
          },
          ...
        ]
      },
      ...
    ]
    
    - Plan should allow **small dynamic adjustments**. 
      Example: If user gets tired in afternoon, have lighter optional suggestions nearby.
    
    - ONLY output the clean JSON structure. No extra commentary.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are a professional travel planner AI. Return only clean JSON structured output.",
      },
    });

    try {
      let rawText: any = response.text?.trim();

      if (rawText.startsWith("```json")) {
        rawText = rawText
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim();
      } else if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```/, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(rawText);

      console.log(parsed);
      return parsed;
    } catch (error) {
      console.error("Failed to parse Gemini response JSON:", error);
      throw new Error("Invalid JSON format received from Gemini");
    }
  } catch (error) {
    console.error("Error generating itinerary plan:", error);
    throw error;
  }
}

export async function chatBasedRecommendation(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro-latest",
      contents: prompt,
      config: {
        systemInstruction: "Always return clean JSON output. No explanation.",
      },
    });

    let rawText: any = response.text?.trim();

    if (rawText.startsWith("```json")) {
      rawText = rawText
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    } else if (rawText.startsWith("```")) {
      rawText = rawText.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const parsed = JSON.parse(rawText);
    return parsed;
  } catch (error) {
    console.error("Error generating chat-based recommendation:", error);
    throw error;
  }
}
