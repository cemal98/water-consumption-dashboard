import { BuildingService } from "../services/buildingService";
import { Building } from "../entities/Building";
import { ObjectId } from "mongodb";
import { AppDataSource } from "../database";

describe("BuildingService Tests", () => {
  let service: BuildingService;
  let repository: any;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-01-08").getTime());
  });

  afterAll(async () => {
    jest.useRealTimers();
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    service = new BuildingService();
    (service as any).repository = repository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all building IDs", async () => {
    const mockBuildings: Building[] = [
      {
        _id: new ObjectId("63e123456789abcdf1234567"),
        id: "1",
        name: "Building A",
        location: "New York",
        date: "2023-01-01",
        consumption: 100,
      },
      {
        _id: new ObjectId("63e123456789abcdf1234568"),
        id: "2",
        name: "Building B",
        location: "Los Angeles",
        date: "2023-01-01",
        consumption: 200,
      },
    ];

    repository.find.mockResolvedValue(mockBuildings);

    const result = await service.getAllBuildingIds();

    expect(repository.find).toHaveBeenCalledWith({ select: ["id"] });
    expect(result).toEqual(["1", "2"]);
  });

  it("should return chart data for given date range and period", async () => {
    const startDate = "2023-01-08";
    const endDate = "2023-01-15";

    const mockData: Building[] = [
      {
        _id: new ObjectId("63e123456789abcdf1234569"),
        id: "3",
        name: "Building C",
        location: "Chicago",
        date: "2023-01-08",
        consumption: 150,
      },
      {
        _id: new ObjectId("63e123456789abcdf1234570"),
        id: "3",
        name: "Building C",
        location: "Chicago",
        date: "2023-01-09",
        consumption: 200,
      },
    ];

    repository.find.mockResolvedValue(mockData);

    const result = await service.getDashboarChartdData({
      startDate,
      endDate,
      period: "daily",
    });

    expect(repository.find).toHaveBeenCalledWith({
      where: {
        date: { $gte: startDate, $lte: endDate },
      },
    });

    expect(result).toEqual([
      { date: "2023-01-08", "Building C": 150 },
      { date: "2023-01-09", "Building C": 200 },
    ]);
  });

  it("should return building details for a specific ID", async () => {
    const today = "2023-01-08";
    const sevenDaysAgo = "2023-01-01";

    const mockData: Building[] = [
      {
        _id: new ObjectId("63e123456789abcdf1234571"),
        id: "4",
        name: "Building D",
        location: "Houston",
        date: sevenDaysAgo,
        consumption: 120,
      },
      {
        _id: new ObjectId("63e123456789abcdf1234572"),
        id: "4",
        name: "Building D",
        location: "Houston",
        date: today,
        consumption: 150,
      },
    ];

    repository.find.mockResolvedValue(mockData);

    const result = await service.getBuildingDetails("4");

    expect(repository.find).toHaveBeenCalledWith({
      where: {
        id: "4",
        date: { $gte: sevenDaysAgo, $lte: today },
      },
      order: { date: "ASC" },
    });

    expect(result).toEqual(mockData);
  });
});
