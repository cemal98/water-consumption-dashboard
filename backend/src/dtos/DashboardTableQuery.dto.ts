import { IsDateString } from "class-validator";

export class DashboardTableQueryDto {
  @IsDateString()
  date: string;
}
