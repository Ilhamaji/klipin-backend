import User from "./user.model.js";
import Note from "./notes.model.js";
import Query from "./queries.model.js";
import Article from "./articles.model.js";
import SavedArticle from "./savedArticle.model.js";

// User punya banyak Note
User.hasMany(Note, {
  foreignKey: 'user_id',
  as: 'notes'
});

// User punya banyak Queries
User.hasMany(Query, {
  foreignKey: 'user_id',
  as: 'queries'
});

// USer punya banyak Saved Article
User.hasMany(SavedArticle, {
  foreignKey: 'user_id',
  as: 'saved_articles'
});

// Query punya banyak Articles
Query.hasMany(Article, {
  foreignKey: 'query_id',
  as: 'articles'
});

// Article punya banyak SavedArticles
Article.hasMany(SavedArticle, {
  foreignKey: 'article_id',
  as: 'saved_by'
});

// setiap Note milik satu User
Note.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author'
});

// setiap Query milik satu User
Query.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user_query'
})

// setiap Article milik satu Query
Article.belongsTo(Query, {
  foreignKey: 'query_id',
  as: 'article_query'
})

// SavedArticle milik satu User
SavedArticle.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// SavedArticle milik satu Article
SavedArticle.belongsTo(Article, {
  foreignKey: 'article_id',
  as: 'article'
});

export {
  User,
  Note,
  Query,
  Article,
  SavedArticle
};