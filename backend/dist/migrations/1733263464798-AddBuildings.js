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
exports.AddBuildings1733263464798 = void 0;
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
class AddBuildings1733263464798 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const buildings = [
                {
                    id: (0, uuid_1.v4)(),
                    name: 'Building 1',
                    location: 'Location 1',
                },
                {
                    id: (0, uuid_1.v4)(),
                    name: 'Building 2',
                    location: 'Location 2',
                },
                {
                    id: (0, uuid_1.v4)(),
                    name: 'Building 3',
                    location: 'Location 3',
                },
            ];
            const today = (0, moment_1.default)();
            const startDate = (0, moment_1.default)().subtract(6, 'months');
            const dailyData = [];
            for (let building of buildings) {
                let currentDate = startDate.clone();
                while (currentDate.isSameOrBefore(today)) {
                    dailyData.push({
                        id: building.id,
                        name: building.name,
                        location: building.location,
                        date: currentDate.format('YYYY-MM-DD'),
                        consumption: Math.floor(Math.random() * 500) + 100,
                    });
                    currentDate.add(1, 'day');
                }
            }
            yield queryRunner.manager.insert('building', dailyData);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.manager.delete('building', {});
        });
    }
}
exports.AddBuildings1733263464798 = AddBuildings1733263464798;
