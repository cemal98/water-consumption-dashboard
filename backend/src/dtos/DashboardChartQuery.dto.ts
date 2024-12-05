import { IsDateString, IsIn } from "class-validator";

export class DashboardChartQueryDto {
  @IsIn(["daily", "monthly"])
  period: "daily" | "monthly";

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
