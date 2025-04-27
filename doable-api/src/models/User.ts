import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true }, // Unique ID you generate
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    preferences: [
      {
        category: { type: String, required: true }, // "Outdoor", "Indoor", "Cuisine"
        type: { type: String, required: true }, // "Hiking", "Museum", "Italian"
        name: { type: String }, // Optional: Specific place like "Sushi Momo"
      },
    ],
    notificationPreference: {
      frequency: {
        type: String,
        enum: ["Daily", "Weekends", "Custom"],
        default: "Daily",
      },
      customDays: [String], // ["Saturday", "Sunday"]
    },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt fields automatically
  }
);

export default mongoose.model("User", userSchema);
