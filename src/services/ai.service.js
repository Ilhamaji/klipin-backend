import axios from "axios";
import { Query, Article, User } from "../models/index.js";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

// Pencarian
const searchArticlesAndClasify = async (query, userId) => {
  const payload = {
    query,
    user_id: userId,
  };

  const response = await axios.post(`${FASTAPI_URL}/ai/search`, payload);
  return response.data;
};

// Cari history pencarian (artikel)
const getSearchHistory = async (userId) => {
  // cari query berdasarkan userid
  const queries = await Query.findAll({
    where: { user_id: userId },
    attributes: { exclude: ['embedding'] },
    include: [
      {
        model: Article,
        as: 'articles',
      }
    ]
  });

  return queries;
}

// hapus history pencarian (artikel)
const deleteHistoryById = async (queryId, userId) => {
  // cari query berdasarkan idnya
  const queries = await Query.findByPk(queryId)

  if (!queries) throw new Error('Pencarian tidak ditemukan!')
  if (queries.user_id !== userId) throw new Error('Tidak memiliki akses untuk pencarian ini.');

  await queries.destroy();
  return { message: 'Pencarian berhasil dihapus!' };
}

// Ringkasan otomatis
const summarizeArticle = async (url) => {
  const response = await axios.post(`${FASTAPI_URL}/ai/summarize`, { url });
  return response.data;
};

export { searchArticlesAndClasify, summarizeArticle, getSearchHistory, deleteHistoryById };
