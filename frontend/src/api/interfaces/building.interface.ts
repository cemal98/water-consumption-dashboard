export interface GetDashboardChartDataParams {
  startDate: string;
  endDate: string;
  period?: string;
}

export interface GetDashboardTableDataParams {
  date: string;
}

export interface DashboardChartData {
  date: string;
  [key: string]: number | string;
}

export interface DashboardTableData {
  id: string;
  date: string;
  consumption: number;
  location: string;
  name: string;
}

export interface Building {
  id: string;
  date: string;
  location: string;
  name: string;
  consumption: string;
}
