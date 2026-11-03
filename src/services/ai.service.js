import axios from "axios";
import { Query, Article, User } from "../models/index.js";

const FASTAPI_URL = process.env.FASTAPI_URL || "https://iruuuu-ai-service-skripsi.hf.space";

// Netlify Functions (sync) abort around 10s. /ai/search needs SerpAPI + LaBSE
// + the ensemble classifier, so keep our own ceiling just under that to fail
// with a readable message instead of an opaque platform timeout (which the
// browser reports as a CORS error).
const AI_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS) || 9000;

const postToAi = (path, payload) =>
  axios.post(`${FASTAPI_URL}${path}`, payload, { timeout: AI_TIMEOUT_MS });

// Pencarian
const searchArticlesAndClasify = async (query, userId) => {
  const payload = {
    query,
    user_id: userId,
  };

  const response = await postToAi("/ai/search", payload);
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
  // Summarizing downloads a PDF and calls the LLM, so allow the platform max.
  const response = await axios.post(
    `${FASTAPI_URL}/ai/summarize`,
    { url },
    { timeout: Number(process.env.AI_SUMMARIZE_TIMEOUT_MS) || 55000 },
  );
  return response.data;
};

export { searchArticlesAndClasify, summarizeArticle, getSearchHistory, deleteHistoryById };
