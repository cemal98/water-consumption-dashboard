import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mongodb",
  database: "waterdashboard",
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [path.join(__dirname, "./entities/*.js")],
  migrations: [path.join(__dirname, "./migrations/*.js")],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
