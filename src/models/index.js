import User from "./user.model.js";
import Note from "./notes.model.js";
import Query from "./queries.model.js";
import Article from "./articles.model.js";

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

// Query punya banyak Articles
Query.hasMany(Article, {
  foreignKey: 'query_id',
  as: 'articles'
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

export {
  User,
  Note,
  Query,
  Article
};