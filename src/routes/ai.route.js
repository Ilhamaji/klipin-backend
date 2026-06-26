import express from 'express';
import { historyController, searchController, summarizeController } from "../controllers/ai.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const aiRoute = express.Router();

// Search Endpoint
aiRoute.post("/search", verifyToken, searchController);
// History Pencarian
aiRoute.get("/search/history", verifyToken, historyController);
// Ringkasan Endpoint
aiRoute.post("/summarize", verifyToken, summarizeController);

export default aiRoute;