import express from "express";
import { registerUser, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/users", getAllUsers);

export default router;
