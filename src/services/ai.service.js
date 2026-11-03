import axios from "axios";
import { Query, Article, User } from "../models/index.js";

const FASTAPI_URL = process.env.FASTAPI_URL || "https://iruuuu-ai-service-skripsi.hf.space";

// Netlify Functions (sync) abort around 10s. /ai/search needs SerpAPI + LaBSE
// + the ensemble classifier, so keep our own ceiling just under that to fail
// with a readable message instead of an opaque platform timeout (which the
// browser reports as a CORS error).
const AI_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS) || 9000;

/**
 * Error for "the AI Space is still booting".
 *
 * A free-tier Space sleeps when idle. The first request after that has to wait
 * for the container to start (tens of seconds), which is far longer than the
 * Netlify function budget. We surface this as a distinct, retryable condition
 * so the client can show "sedang disiapkan, coba lagi" instead of a generic
 * failure.
 */
export class AiWarmupError extends Error {
  constructor(message) {
    super(message);
    this.name = "AiWarmupError";
    this.code = "AI_WARMING_UP";
  }
}

const WARMUP_MESSAGE =
  "Layanan AI sedang disiapkan (pertama kali dipakai butuh beberapa saat). Silakan coba lagi dalam 30 detik.";

const postToAi = async (path, payload, timeoutMs = AI_TIMEOUT_MS) => {
  try {
    return await axios.post(`${FASTAPI_URL}${path}`, payload, { timeout: timeoutMs });
  } catch (error) {
    // ECONNABORTED/ETIMEDOUT from our own ceiling, or 502/503/504 from the
    // proxy while the container starts, both mean "not ready yet".
    const status = error.response?.status;
    const isTimeout = error.code === "ECONNABORTED" || error.code === "ETIMEDOUT";
    const isStarting = status === 502 || status === 503 || status === 504;
    if (isTimeout || isStarting) {
      throw new AiWarmupError(WARMUP_MESSAGE);
    }
    throw error;
  }
};

/**
 * Cheap readiness probe used to warm the Space from real user activity.
 * Never throws: a sleeping Space simply reports ready=false.
 */
const checkAiReady = async () => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/health`, { timeout: 4000 });
    return { ready: response.status === 200, status: response.status };
  } catch {
    return { ready: false, status: null };
  }
};

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
  const response = await postToAi(
    "/ai/summarize",
    { url },
    Number(process.env.AI_SUMMARIZE_TIMEOUT_MS) || 55000,
  );
  return response.data;
};

export {
  searchArticlesAndClasify,
  summarizeArticle,
  getSearchHistory,
  deleteHistoryById,
  checkAiReady,
};
