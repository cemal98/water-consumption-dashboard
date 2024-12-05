import {
  JsonController,
  Get,
  Res,
  QueryParam,
  QueryParams,
  Param,
} from "routing-controllers";
import { Service } from "typedi";
import { BuildingService } from "../services/buildingService";
import { Response } from "express";
import { DashboardChartQueryDto } from "../dtos/DashboardChartQuery.dto";
import { DashboardTableQueryDto } from "../dtos/DashboardTableQuery.dto";
import { Building } from "../entities/Building";

@Service()
@JsonController("/buildings")
export class BuildingController {
  constructor(private service: BuildingService) {}

  @Get("/ids")
  async getBuildingIds(): Promise<string[]> {
    return await this.service.getAllBuildingIds();
  }

  @Get("/chart")
  async getDashboardChartData(@QueryParams() query: DashboardChartQueryDto) {
    return await this.service.getDashboarChartdData(query);
  }

  @Get("/table")
  async getDashboardTableData(@QueryParams() query: DashboardTableQueryDto) {
    return await this.service.getDashboardTabledData(query);
  }

  @Get("/:id")
  async getBuildingDetails(@Param("id") id: string): Promise<Building[]> {
    return await this.service.getBuildingDetails(id);
  }
}
