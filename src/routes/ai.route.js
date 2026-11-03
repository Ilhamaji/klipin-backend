import express from 'express';
import { deleteSearchHistoryController, historyController, searchController, summarizeController, aiReadyController } from "../controllers/ai.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const aiRoute = express.Router();

// Readiness probe: no auth, cheap, used to warm the AI Space from real
// user activity. Must stay public so the client can call it before login UI
// settles, and must stay lightweight so it never blocks the function budget.
aiRoute.get("/ai/ready", aiReadyController);
// Search Endpoint
aiRoute.post("/search", verifyToken, searchController);
// History Pencarian
aiRoute.get("/search/history", verifyToken, historyController);
// Delete pencarian by id
aiRoute.delete("/search/history/:queryId", verifyToken, deleteSearchHistoryController);
// Ringkasan Endpoint
aiRoute.post("/summarize", verifyToken, summarizeController);

export default aiRoute;