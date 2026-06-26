import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Query = sequelize.define(
  "Query",
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
    query_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    embedding: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "queries",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

export default Query;