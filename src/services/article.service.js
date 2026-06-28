import { SavedArticle, Article } from "../models/index.js";

// Simpan artikel
export const saveArticle = async (userId, articleId) => {
  // cek apakah artikel ada di database
  const article = await Article.findByPk(articleId);
  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  // cek apakah sudah disimpan sebelumnya
  const existing = await SavedArticle.findOne({
    where: { user_id: userId, article_id: articleId }
  });
  if (existing) {
    throw new Error("Artikel sudah disimpan sebelumnya");
  }

  const saved = await SavedArticle.create({
    user_id: userId,
    article_id: articleId,
  });

  return saved;
};

// Hapus artikel
export const deleteSavedArticle = async (userId, articleId) => {
  // cek apakah artikel ada di database
  const article = await Article.findByPk(articleId);
  if (!article) {
    throw new Error("Artikel tidak ditemukan");
  }

  const existing = await SavedArticle.findOne({
    where: { user_id: userId, article_id: articleId }
  });
  if (!existing) {
    throw new Error("Artikel tidak ditemukan di library");
  }

  await existing.destroy();
  return { message: 'Artikel berhasil dihapus dari library!' };
};

// Lihat semua artikel yg disimpan
export const allSavedArticle = async (userId) => {
  // cek apakah ada 1 atau lebih artikel
  const article = await SavedArticle.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Article,
        as: "article",
      }
    ]
  });

  // kembalikan data seluruh artikel
  return article;
}