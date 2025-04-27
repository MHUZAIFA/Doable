import { Request, Response } from "express";
import Itinerary from "../models/Itenary";
import { generateItineraryPlan, ItineraryFilters } from "../services/gemini";
import User from "../models/User";

export const createItinerary = async (req: Request, res: Response) => {
  try {
    const { userId, activities } = req.body;

    if (!userId || !activities || !Array.isArray(activities)) {
      res
        .status(400)
        .json({ message: "User ID and valid activities are required." });
      return;
    }

    const newItinerary = await Itinerary.create({ userId, activities });

    res.status(201).json({
      message: "Itinerary created successfully!",
      itinerary: newItinerary,
    });
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({ message: "Failed to create itinerary" });
  }
};
export const getItinerariesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const itineraries = await Itinerary.find({ userId });
    res.json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch itineraries" });
  }
};

export const generateItinerary = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; // or if you use token later, extract from token
    const filters: ItineraryFilters = req.body.filters;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const result = await generateItineraryPlan(userId, filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Error generating itinerary:", error);
    res
      .status(500)
      .json({ message: "Failed to generate itinerary", error: error.message });
  }
};

// import { Request, Response } from "express";
// import User from "../models/User";

export const saveItinerary = async (req: Request, res: Response) => {
  try {
    const { userId, itinerary } = req.body;

    if (!userId || !itinerary) {
      res.status(400).json({ message: "User ID and itinerary are required." });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const activities: any[] = [];

    // Flatten and clean Gemini response
    for (const day of itinerary) {
      if (day.timeline && Array.isArray(day.timeline)) {
        for (const activity of day.timeline) {
          activities.push({
            title: activity.title,
            description: activity.description,
            address: activity.location,
            latitude: activity.latitude,
            longitude: activity.longitude,
            type: activity.category,
          });
        }
      }
    }

    // Save it
    const newItinerary = await Itinerary.create({
      userId: user._id,
      activities,
    });

    res.status(201).json({
      message: "Itinerary saved successfully!",
      itineraryId: newItinerary._id,
    });
  } catch (error) {
    console.error("Error saving itinerary:", error);
    res.status(500).json({ message: "Failed to save itinerary" });
  }
};
