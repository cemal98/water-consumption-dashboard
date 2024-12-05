import { useQuery } from "react-query";
import { AxiosHelper } from "@/helpers/axios.helper";
import {
  Building,
  DashboardChartData,
  DashboardTableData,
  GetDashboardChartDataParams,
  GetDashboardTableDataParams,
} from "../interfaces/building.interface";

export const useGetBuildingIds = () => {
  type Response = Promise<string[]>;
  return useQuery(
    ["getBuildingIds"],
    () => AxiosHelper.instance.get(`/buildings/ids`) as Response
  );
};

export const useGetDashboardChartData = (
  params: GetDashboardChartDataParams
) => {
  type Response = Promise<DashboardChartData[]>;
  return useQuery(
    ["dashboardChartData", params],
    () => AxiosHelper.instance.get("/buildings/chart", { params }) as Response,
    {
      enabled: !!params.startDate && !!params.endDate,
    }
  );
};

export const useGetDashboardTableData = (
  params: GetDashboardTableDataParams
) => {
  type Response = Promise<DashboardTableData[]>;
  return useQuery(
    ["dashboardTableData", params],
    () => AxiosHelper.instance.get("/buildings/table", { params }) as Response,
    {
      enabled: !!params.date,
    }
  );
};

export const useGetBuildingDetails = (id: string) => {
  type Response = Promise<Building[]>;
  return useQuery(
    ["getBuildingDetails", id],
    () => AxiosHelper.instance.get(`/buildings/${id}`) as Response,
    {
      enabled: !!id,
    }
  );
};
