import express from 'express';
import { registerController, loginController, getUserProfileController } from '../controllers/auth.controller.js';
import { registerValidator } from '../utils/auth.validator.js';
import verifyToken from "../middlewares/auth.middleware.js";

const authRoute = express.Router();

// Login
authRoute.post("/login", loginController);

export default authRoute;
// Get User Profile
authRoute.get("/profile", verifyToken, getUserProfileController);

