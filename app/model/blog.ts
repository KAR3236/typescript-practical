import { DataTypes, Model } from "sequelize";
import { BlogModelAttributes } from "../utils/modelInterface";
import { sequelize } from "../helper/db";

export interface BlogModelInstance
  extends Model<BlogModelAttributes>,
    BlogModelAttributes {}

export const Blog = sequelize.define<BlogModelInstance>(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    publised_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    modify_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Publish", "Unpublish"),
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
