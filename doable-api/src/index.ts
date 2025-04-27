import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwtCheck from "./middleware/auth";

import userRoutes from "./routes/userRoutes";
import itineraryRoutes from "./routes/itenaryRoutes";
import chatBotRoutes from "./routes/chatBotRoutes"; // 👈 NEW

const passport = require('passport');
const session = require('express-session');
const Auth0Strategy = require('passport-auth0');

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// Configure session
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

// Set up Passport
passport.use(new Auth0Strategy({
  domain: 'dev-r582yi3dsehcz4as.us.auth0.com',  // example: 'dev-abc123.auth0.com'
  clientID: 'H30bVSsgUkN29unMHJeffmqe7fjOIJCN',
  clientSecret: '-a5lC99bQobri0GR5oxnKTHzaW3zetl4jsa1AUJBHo_rPjatitlFyyYmSWvMn4hc',
  callbackURL: 'http://localhost:3000/callback'  // This should match the callback URL you set in the Auth0 dashboard
}, (accessToken: any, refreshToken: any, extraParams: any, profile: any, done: (arg0: null, arg1: any) => any) => {
  // Here, you can save user data to a session or database
  return done(null, profile);
}));

passport.serializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: null, arg1: any) => void) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Route for login
app.get('/login', passport.authenticate('auth0', {
  scope: 'openid profile email'
}));

// Callback route
app.get('/callback', passport.authenticate('auth0', {
  failureRedirect: '/'
}), (req, res) => {
  // Redirect the user after login
  res.redirect('/');
});

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
