import { Request, Response } from "express";
import Itinerary from "../models/Itenary";
import { generateItineraryPlan, ItineraryFilters } from "../services/gemini";

export const createItinerary = async (req: Request, res: Response) => {
  try {
    const { userId, activities } = req.body;
    const newItinerary = await Itinerary.create({ userId, activities });
    res.status(201).json(newItinerary);
  } catch (error) {
    console.error(error);
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
