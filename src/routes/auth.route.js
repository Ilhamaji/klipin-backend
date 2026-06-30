import express from 'express';
import { registerController, loginController, getUserProfileController } from '../controllers/auth.controller.js';
import { registerValidator } from '../utils/auth.validator.js';
import verifyToken from "../middlewares/auth.middleware.js";

const authRoute = express.Router();

// Login
authRoute.post("/login", loginController);
// Register
authRoute.post("/register", registerValidator, registerController);
// Get User Profile
authRoute.get("/profile", verifyToken, getUserProfileController);

export default authRoute;