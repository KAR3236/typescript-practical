import * as dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DBNAME!,
  process.env.DBUSER!,
  "Postgres",
  {
    host: process.env.DBHOST!,
    dialect: (process.env.DIALECT as Dialect) || "postgres",
    port: parseInt(process.env.DBPORT!, 10) || 5432,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connection establish...");
  })
  .catch((error: any) => {
    console.log("error", error);
  });

sequelize
  .sync()
  .then(() => {
    console.log("Yes re-sync");
  })
  .catch((error: any) => {
    console.log("No re-sync error", error);
  });
