import {
  deleteHistoryById,
  getSearchHistory,
  searchArticlesAndClasify,
  summarizeArticle,
} from "../services/ai.service.js";

import { cekUserById } from "../services/auth.service.js";

const searchController = async (req, res) => {
  try {
    const { query } = req.body;
    const { userId } = req.user;

    if (!query) {
      return res.status(400).json({
        message: "Query tidak boleh kosong",
      });
    }

    if (!userId) {
      return res.status(400).json({
        message: "User Id tidak ada atau tidak valid!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const result = await searchArticlesAndClasify(query, userId);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail || "Gagal menghubungi layanan AI";
    return res.status(status).json({ message });
  }
};

// History search controller
const historyController = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(400).json({
        message: "User Id tidak ada atau tidak valid!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const result = await getSearchHistory(userId);

    if (result.length === 0) {
      return res.status(200).json({
        error: false,
        message: "Belum ada history pencarian.",
        data: [],
      });
    }

    return res.status(200).json({
      error: false,
      message: "Berhasil menemukan history pencarian!",
      data: result.map((q) => q.toJSON()),
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
const summarizeController = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL tidak boleh kosong" });
    }

    const result = await summarizeArticle(url);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail || "Gagal menghubungi layanan AI";
    return res.status(status).json({ message });
  }
};

// delete pencarian
const deleteSearchHistoryController = async (req, res) => {
  try {
    const { userId } = req.user;
    const { queryId } = req.params;

    if (isNaN(queryId)) {
      return res.status(400).json({
        error: true,
        message: "Format id tidak valid!",
      });
    }

    const existingUser = await cekUserById(userId);
    if (!existingUser) {
      return res.status(404).json({
        error: true,
        message: "User tidak ditemukan!",
      });
    }

    const result = await deleteHistoryById(queryId, userId);
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
}

export { searchController, summarizeController, historyController, deleteSearchHistoryController };
