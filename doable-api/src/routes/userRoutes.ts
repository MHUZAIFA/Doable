import { Router } from "express";
import {
  createUser,
  getUserById,
  updateUser,
} from "../controllers/UserController";

const router = Router();

router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser); // 👈 Make sure this line exists

export default router;
