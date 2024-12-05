import { Service } from "typedi";
import { DashboardChartQueryDto } from "../dtos/DashboardChartQuery.dto";
import { DashboardTableQueryDto } from "../dtos/DashboardTableQuery.dto";
import { MongoRepository } from "typeorm/repository/MongoRepository";
import { Building } from "../entities/Building";
import { AppDataSource } from "../database";
import moment from "moment";

@Service()
export class BuildingService {
  private repository: MongoRepository<Building>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Building);
  }

  async getAllBuildingIds(): Promise<string[]> {
    const buildings = await this.repository.find({ select: ["id"] });
    const uniqueIds = Array.from(
      new Set(buildings.map((building) => building.id))
    );

    return uniqueIds;
  }

  async getDashboarChartdData(queryDto: DashboardChartQueryDto) {
    const { period, startDate, endDate } = queryDto;

    const startMoment = moment(startDate, "YYYY-MM-DD");
    const endMoment =
      period === "monthly"
        ? moment(endDate, "YYYY-MM-DD").endOf("month")
        : moment(endDate, "YYYY-MM-DD");

    const data = await this.repository.find({
      where: {
        date: {
          $gte: startMoment.format("YYYY-MM-DD"),
          $lte: endMoment.format("YYYY-MM-DD"),
        },
      },
    });

    const aggregatedData: Record<string, any> = {};

    data.forEach((building) => {
      const dateKey =
        period === "daily"
          ? moment(building.date).format("YYYY-MM-DD")
          : moment(building.date).format("YYYY-MM-01");

      if (!aggregatedData[dateKey]) {
        aggregatedData[dateKey] = { date: dateKey };
      }

      if (!aggregatedData[dateKey][building.name]) {
        aggregatedData[dateKey][building.name] = 0;
      }

      aggregatedData[dateKey][building.name] += building.consumption;
    });

    return Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).isBefore(moment(b.date)) ? -1 : 1
    );
  }

  async getDashboardTabledData(
    queryDto: DashboardTableQueryDto,
    sortOrder: "ASC" | "DESC" = "ASC"
  ) {
    const { date } = queryDto;
    const startOfMonth = moment(date, "YYYY-MM")
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = moment(date, "YYYY-MM")
      .endOf("month")
      .format("YYYY-MM-DD");

    const data = await this.repository.find({
      where: {
        date: { $gte: startOfMonth, $lte: endOfMonth },
      },
    });

    const aggregatedData: Record<string, any> = {};

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
      } else {
        return b.consumption - a.consumption;
      }
    });

    return sortedData;
  }

  async getBuildingDetails(id: string) {
    const today = moment().format("YYYY-MM-DD");
    const sevenDaysAgo = moment().subtract(7, "days").format("YYYY-MM-DD");

    const data = await this.repository.find({
      where: {
        id,
        date: { $gte: sevenDaysAgo, $lte: today },
      },
      order: { date: "ASC" },
    });

    return data;
  }
}
