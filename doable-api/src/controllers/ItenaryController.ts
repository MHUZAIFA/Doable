import { Request, Response } from "express";
import Itinerary from "../models/Itenary";

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
