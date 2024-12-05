"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.BuildingService = void 0;
const typedi_1 = require("typedi");
const Building_1 = require("../entities/Building");
const database_1 = require("../database");
const moment_1 = __importDefault(require("moment"));
let BuildingService = class BuildingService {
    constructor() {
        this.repository = database_1.AppDataSource.getMongoRepository(Building_1.Building);
    }
    getAllBuildingIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const buildings = yield this.repository.find({ select: ["id"] });
            const uniqueIds = Array.from(new Set(buildings.map((building) => building.id)));
            return uniqueIds;
        });
    }
    getDashboarChartdData(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { period, startDate, endDate } = queryDto;
            const startMoment = (0, moment_1.default)(startDate, "YYYY-MM-DD");
            const endMoment = period === "monthly"
                ? (0, moment_1.default)(endDate, "YYYY-MM-DD").endOf("month")
                : (0, moment_1.default)(endDate, "YYYY-MM-DD");
            const data = yield this.repository.find({
                where: {
                    date: {
                        $gte: startMoment.format("YYYY-MM-DD"),
                        $lte: endMoment.format("YYYY-MM-DD"),
                    },
                },
            });
            const aggregatedData = {};
            data.forEach((building) => {
                const dateKey = period === "daily"
                    ? (0, moment_1.default)(building.date).format("YYYY-MM-DD")
                    : (0, moment_1.default)(building.date).format("YYYY-MM-01");
                if (!aggregatedData[dateKey]) {
                    aggregatedData[dateKey] = { date: dateKey };
                }
                if (!aggregatedData[dateKey][building.name]) {
                    aggregatedData[dateKey][building.name] = 0;
                }
                aggregatedData[dateKey][building.name] += building.consumption;
            });
            return Object.values(aggregatedData).sort((a, b) => (0, moment_1.default)(a.date).isBefore((0, moment_1.default)(b.date)) ? -1 : 1);
        });
    }
    getDashboardTabledData(queryDto_1) {
        return __awaiter(this, arguments, void 0, function* (queryDto, sortOrder = "ASC") {
            const { date } = queryDto;
            const startOfMonth = (0, moment_1.default)(date, "YYYY-MM")
                .startOf("month")
                .format("YYYY-MM-DD");
            const endOfMonth = (0, moment_1.default)(date, "YYYY-MM")
                .endOf("month")
                .format("YYYY-MM-DD");
            const data = yield this.repository.find({
                where: {
                    date: { $gte: startOfMonth, $lte: endOfMonth },
                },
            });
            const aggregatedData = {};
            data.forEach((building) => {
                const key = `${building.name}-${building.location}`;
                if (!aggregatedData[key]) {
                    aggregatedData[key] = {
                        id: building.id,
                        name: building.name,
                        location: building.location,
                        consumption: 0,
                    };
                }
                aggregatedData[key].consumption += building.consumption;
            });
            const sortedData = Object.values(aggregatedData).sort((a, b) => {
                if (sortOrder === "ASC") {
                    return a.consumption - b.consumption;
                }
                else {
                    return b.consumption - a.consumption;
                }
            });
            return sortedData;
        });
    }
    getBuildingDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = (0, moment_1.default)().format("YYYY-MM-DD");
            const sevenDaysAgo = (0, moment_1.default)().subtract(7, "days").format("YYYY-MM-DD");
            const data = yield this.repository.find({
                where: {
                    id,
                    date: { $gte: sevenDaysAgo, $lte: today },
                },
                order: { date: "ASC" },
            });
            return data;
        });
    }
};
exports.BuildingService = BuildingService;
exports.BuildingService = BuildingService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], BuildingService);
