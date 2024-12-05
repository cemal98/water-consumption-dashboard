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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const buildingService_1 = require("../services/buildingService");
const DashboardChartQuery_dto_1 = require("../dtos/DashboardChartQuery.dto");
const DashboardTableQuery_dto_1 = require("../dtos/DashboardTableQuery.dto");
let BuildingController = class BuildingController {
    constructor(service) {
        this.service = service;
    }
    getBuildingIds() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getAllBuildingIds();
        });
    }
    getDashboardChartData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getDashboarChartdData(query);
        });
    }
    getDashboardTableData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getDashboardTabledData(query);
        });
    }
    getBuildingDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getBuildingDetails(id);
        });
    }
};
exports.BuildingController = BuildingController;
__decorate([
    (0, routing_controllers_1.Get)("/ids"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuildingController.prototype, "getBuildingIds", null);
__decorate([
    (0, routing_controllers_1.Get)("/chart"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DashboardChartQuery_dto_1.DashboardChartQueryDto]),
    __metadata("design:returntype", Promise)
], BuildingController.prototype, "getDashboardChartData", null);
__decorate([
    (0, routing_controllers_1.Get)("/table"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DashboardTableQuery_dto_1.DashboardTableQueryDto]),
    __metadata("design:returntype", Promise)
], BuildingController.prototype, "getDashboardTableData", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BuildingController.prototype, "getBuildingDetails", null);
exports.BuildingController = BuildingController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/buildings"),
    __metadata("design:paramtypes", [buildingService_1.BuildingService])
], BuildingController);
