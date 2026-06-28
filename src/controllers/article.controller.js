import {
  saveArticle,
  deleteSavedArticle,
  allSavedArticle,
} from "../services/article.service.js";
import { cekUserById } from "../services/auth.service.js";

// Simpan artikel
export const saveArticleController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { articleId } = req.body;

    if (!articleId) {
      return res.status(400).json({
        error: true,
        message: "Article ID tidak boleh kosong!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const result = await saveArticle(userId, articleId);
    return res.status(201).json({
      error: false,
      message: "Artikel berhasil disimpan!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// Hapus artikel yang disimpan
export const deleteArticleController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { articleId } = req.params;

    if (!articleId) {
      return res.status(400).json({
        error: true,
        message: "Article ID tidak boleh kosong!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const result = await deleteSavedArticle(userId, Number(articleId));
    return res.status(200).json({
      error: false,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// Lihat seluruh data artikel yg disimpan
export const getAllSavedArticleController = async (req, res) => {
  try {
    const { userId } = req.user;

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const result = await allSavedArticle(userId);
    
    if (result.length === 0) {
      return res.status(200).json({
        error: false,
        message: "Belum ada artikel yang disimpan.",
        data: [],
      });
    }

    return res.status(200).json({
      error: false,
      message: "Berhasil mengambil artikel yang disimpan!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
