import express from "express";
import { saveArticleController, deleteArticleController } from "../controllers/article.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const articleRoute = express.Router();

// simpan artikel
articleRoute.post("/saved-articles", verifyToken,saveArticleController);
// delete artikel
articleRoute.delete("/saved-articles/:articleId", verifyToken, deleteArticleController);

export default articleRoute;