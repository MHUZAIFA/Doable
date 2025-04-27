// src/models/Itinerary.ts
import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Store userId like "auth0|..."
  activities: [
    {
      title: { type: String },
      description: { type: String },
      address: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      type: { type: String },
      _id: false, // Prevent MongoDB from auto-generating _id inside activities array
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
