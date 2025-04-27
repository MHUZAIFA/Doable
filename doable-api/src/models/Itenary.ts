import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activities: [
    {
      name: String,
      
      address: String,
      lat: Number,
      lng: Number,
      type: String, // "Restaurant", "Outdoor Activity", etc.
      timeSuggested: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Itinerary", itinerarySchema);
