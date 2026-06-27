import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const SavedArticle = sequelize.define(
  "SavedArticle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "saved_articles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default SavedArticle;