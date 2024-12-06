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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const database_1 = require("../database");
const Building_1 = require("../entities/Building");
const mongodb_1 = require("mongodb");
const moment_1 = __importDefault(require("moment"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!database_1.AppDataSource.isInitialized) {
        yield database_1.AppDataSource.initialize();
    }
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const repository = database_1.AppDataSource.getMongoRepository(Building_1.Building);
    yield repository.delete({});
}));
describe("BuildingController Tests", () => {
    it("GET /buildings/ids - should return all building IDs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBuildings = [
            { _id: new mongodb_1.ObjectId(), id: "1", name: "Building A", consumption: 100 },
            { _id: new mongodb_1.ObjectId(), id: "2", name: "Building B", consumption: 200 },
        ];
        const repository = database_1.AppDataSource.getMongoRepository(Building_1.Building);
        yield repository.save(mockBuildings);
        const response = yield (0, supertest_1.default)(app_1.app).get("/buildings/ids");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(["1", "2"]);
    }));
    it("GET /buildings/chart - should return chart data for given query", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBuilding = {
            _id: new mongodb_1.ObjectId(),
            id: "3",
            name: "Building C",
            consumption: 150,
            date: "2023-01-01",
        };
        const repository = database_1.AppDataSource.getMongoRepository(Building_1.Building);
        yield repository.save(mockBuilding);
        const response = yield (0, supertest_1.default)(app_1.app).get("/buildings/chart").query({
            period: "monthly",
            startDate: "2023-01-01",
            endDate: "2023-12-31",
        });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    it("GET /buildings/:id - should return building details", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const sevenDaysAgo = (0, moment_1.default)().subtract(7, "days").format("YYYY-MM-DD");
        const mockBuilding = {
            _id: new mongodb_1.ObjectId(),
            id: "4",
            name: "Building D",
            consumption: 120,
            date: sevenDaysAgo,
        };
        const repository = database_1.AppDataSource.getMongoRepository(Building_1.Building);
        yield repository.save(mockBuilding);
        const response = yield (0, supertest_1.default)(app_1.app).get("/buildings/4");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect((_a = response.body[0]) === null || _a === void 0 ? void 0 : _a.id).toBe("4");
    }));
});
