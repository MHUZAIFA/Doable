import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwtCheck from "./middleware/auth";

import userRoutes from "./routes/userRoutes";
import itineraryRoutes from "./routes/itenaryRoutes";
import chatBotRoutes from "./routes/chatBotRoutes"; // 👈 NEW

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI not found in environment variables");
    }
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Stop server if DB fails
  }
};

// API Routes
app.use("/api/users", jwtCheck, userRoutes);
app.use("/api/itenaries", jwtCheck, itineraryRoutes);
app.use("/api/chat", jwtCheck, chatBotRoutes); // 👈 ADD THIS for chatbot

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy!" });
});

// Start the server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
