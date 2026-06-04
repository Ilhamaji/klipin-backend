import express from 'express';
import { registerController, loginController } from '../controllers/auth.controller.js';
import { registerValidator } from '../utils/auth.validator.js';

const authRoute = express.Router();

// Register
authRoute.post('/register', registerValidator, registerController);
// Login
authRoute.post("/login", loginController);

export default authRoute;