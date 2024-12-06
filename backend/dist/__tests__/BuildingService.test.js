"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildingService_1 = require("../services/buildingService");
const mongodb_1 = require("mongodb");
const database_1 = require("../database");
describe("BuildingService Tests", () => {
    let service;
    let repository;
    beforeAll(() => {
        // Tarihleri sabitlemek için jest'in fake timers özelliği kullanılıyor
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2023-01-08").getTime());
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.useRealTimers();
        // AppDataSource'in kapatılmasını sağla
        if (database_1.AppDataSource.isInitialized) {
            yield database_1.AppDataSource.destroy();
        }
    }));
    beforeEach(() => {
        // Mock repository oluşturuluyor
        repository = {
            find: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };
        service = new buildingService_1.BuildingService();
        service.repository = repository;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return all building IDs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBuildings = [
            {
                _id: new mongodb_1.ObjectId("63e123456789abcdf1234567"),
                id: "1",
                name: "Building A",
                location: "New York",
                date: "2023-01-01",
                consumption: 100,
            },
            {
                _id: new mongodb_1.ObjectId("63e123456789abcdf1234568"),
                id: "2",
                name: "Building B",
                location: "Los Angeles",
                date: "2023-01-01",
                consumption: 200,
            },
        ];
        repository.find.mockResolvedValue(mockBuildings);
        const result = yield service.getAllBuildingIds();
        expect(repository.find).toHaveBeenCalledWith({ select: ["id"] });
        expect(result).toEqual(["1", "2"]);
    }));
    it("should return chart data for given date range and period", () => __awaiter(void 0, void 0, void 0, function* () {
        const startDate = "2023-01-08"; // Mocklanan sabit tarih
        const endDate = "2023-01-15"; // Test aralığı
        const mockData = [
            {
                _id: new mongodb_1.ObjectId("63e123456789abcdf1234569"),
                id: "3",
                name: "Building C",
                location: "Chicago",
                date: "2023-01-08",
                consumption: 150,
            },
            {
                _id: new mongodb_1.ObjectId("63e123456789abcdf1234570"),
                id: "3",
                name: "Building C",
                location: "Chicago",
                date: "2023-01-09",
                consumption: 200,
            },
        ];
        repository.find.mockResolvedValue(mockData);
        const result = yield service.getDashboarChartdData({
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
    }));
    it("should return building details for a specific ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const today = "2023-01-08"; // Jest ile sabitlenen tarih
        const sevenDaysAgo = "2023-01-01";
        const mockData = [
            {
                _id: new mongodb_1.ObjectId("63e123456789abcdf1234571"),
                id: "4",
                name: "Building D",
                location: "Houston",
                date: sevenDaysAgo,
                consumption: 120,
            },
            {
                _id: new mongodb_1.ObjectId("63e123456789abcdf1234572"),
                id: "4",
                name: "Building D",
                location: "Houston",
                date: today,
                consumption: 150,
            },
        ];
        repository.find.mockResolvedValue(mockData);
        const result = yield service.getBuildingDetails("4");
        expect(repository.find).toHaveBeenCalledWith({
            where: {
                id: "4",
                date: { $gte: sevenDaysAgo, $lte: today },
            },
            order: { date: "ASC" },
        });
        expect(result).toEqual(mockData);
    }));
});
