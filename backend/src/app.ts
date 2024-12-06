import "reflect-metadata";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";
import { createExpressServer } from "routing-controllers";
import { BuildingController } from "./controllers/buildingController";

useContainer(Container);

export const app = createExpressServer({
  controllers: [BuildingController],
  cors: {
    origin: [
      "http://localhost:3000",
      "https://water-consumption-dashboard-juu78e9cs-cemals-projects-1d23365a.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
