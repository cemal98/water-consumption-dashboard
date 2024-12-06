import express from "express";
import cors from "cors";
import "reflect-metadata";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";
import { createExpressServer } from "routing-controllers";
import { BuildingController } from "./controllers/buildingController";

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

useContainer(Container);

app.use(
  createExpressServer({
    controllers: [BuildingController],
  })
);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
