import express from "express";
import { saveArticleController, deleteArticleController, getAllSavedArticleController } from "../controllers/article.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const articleRoute = express.Router();

// simpan artikel
articleRoute.post("/saved-articles", verifyToken, saveArticleController);
// delete artikel
articleRoute.delete("/saved-articles/:articleId", verifyToken, deleteArticleController);
// all artikel
articleRoute.get("/saved-articles", verifyToken, getAllSavedArticleController);

export default articleRoute;