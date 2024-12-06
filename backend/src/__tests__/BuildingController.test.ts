import request from "supertest";
import { app } from "../app";
import { AppDataSource } from "../database";
import { Building } from "../entities/Building";
import { ObjectId } from "mongodb";
import moment from "moment";

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

beforeEach(async () => {
  const repository = AppDataSource.getMongoRepository(Building);
  await repository.delete({});
});

describe("BuildingController Tests", () => {
  it("GET /buildings/ids - should return all building IDs", async () => {
    const mockBuildings = [
      { _id: new ObjectId(), id: "1", name: "Building A", consumption: 100 },
      { _id: new ObjectId(), id: "2", name: "Building B", consumption: 200 },
    ];

    const repository = AppDataSource.getMongoRepository(Building);
    await repository.save(mockBuildings);

    const response = await request(app).get("/buildings/ids");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(["1", "2"]);
  });

  it("GET /buildings/chart - should return chart data for given query", async () => {
    const mockBuilding = {
      _id: new ObjectId(),
      id: "3",
      name: "Building C",
      consumption: 150,
      date: "2023-01-01",
    };

    const repository = AppDataSource.getMongoRepository(Building);
    await repository.save(mockBuilding);

    const response = await request(app).get("/buildings/chart").query({
      period: "monthly",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /buildings/:id - should return building details", async () => {
    const sevenDaysAgo = moment().subtract(7, "days").format("YYYY-MM-DD");

    const mockBuilding = {
      _id: new ObjectId(),
      id: "4",
      name: "Building D",
      consumption: 120,
      date: sevenDaysAgo,
    };

    const repository = AppDataSource.getMongoRepository(Building);
    await repository.save(mockBuilding);

    const response = await request(app).get("/buildings/4");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]?.id).toBe("4");
  });
});
