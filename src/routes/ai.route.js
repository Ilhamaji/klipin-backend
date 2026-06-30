import express from 'express';
import { deleteSearchHistoryController, historyController, searchController, summarizeController } from "../controllers/ai.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const aiRoute = express.Router();

// Search Endpoint
aiRoute.post("/search", verifyToken, searchController);
// History Pencarian
aiRoute.get("/search/history", verifyToken, historyController);
// Delete pencarian by id
aiRoute.delete("/search/history/:queryId", verifyToken, deleteSearchHistoryController);
// Ringkasan Endpoint
aiRoute.post("/summarize", verifyToken, summarizeController);

export default aiRoute;