import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      name,
      email,
      preferences,
      notificationPreference,
      location,
    } = req.body;

    const newUser = await User.create({
      userId,
      name,
      email,
      preferences: preferences || [], // default to empty array if not provided
      notificationPreference: notificationPreference || {
        frequency: "Daily",
        customDays: [],
      },
      location: location || {},
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // MongoDB _id now

    // Validate if the id is a correct ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid MongoDB User ID" });
      return;
    }

    const { preferences, notificationPreference, location } = req.body;

    const updateFields: any = {};

    if (preferences !== undefined) {
      updateFields.preferences = preferences;
    }

    if (notificationPreference !== undefined) {
      updateFields.notificationPreference = notificationPreference;
    }

    if (location !== undefined) {
      updateFields.location = location;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id, // 👈 Now find by _id
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return; 
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user" });
    return;
  }
};
