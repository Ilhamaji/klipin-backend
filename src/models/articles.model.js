import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    query_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    authors: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    jenjang: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    relevance_score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "articles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default Article;
