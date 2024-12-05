import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DateRange } from "react-day-picker";
import { useGetDashboardChartData } from "@/api/services/building.service";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "../ui/chart";
import {
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import useURLParams from "@/hooks/useUrlParams";
import { DatePickerWithRange } from "../DateRangePicker/DateRangePicker";

const DashboardChart = () => {
  const { getQueryParam, setQueryParam } = useURLParams();

  const [period, setPeriod] = useState<string>(
    getQueryParam("period") || "monthly"
  );

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({
    from: getQueryParam("from")
      ? new Date(getQueryParam("from"))
      : new Date(2024, 6, 1),
    to: getQueryParam("to")
      ? new Date(getQueryParam("to"))
      : new Date(2024, 8, 1),
  });

  const { data, isLoading, isError } = useGetDashboardChartData({
    period,
    startDate: moment(selectedDateRange?.from).format("YYYY-MM-DD"),
    endDate: moment(selectedDateRange?.to).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    console.log("Updating Query Params", {
      from: selectedDateRange?.from,
      to: selectedDateRange?.to,
      period,
    });
    if (selectedDateRange?.from) {
      setQueryParam(
        "from",
        moment(selectedDateRange.from).format("YYYY-MM-DD")
      );
    }
    if (selectedDateRange?.to) {
      setQueryParam("to", moment(selectedDateRange.to).format("YYYY-MM-DD"));
    }
    if (period) {
      setQueryParam("period", period);
    }
  }, [selectedDateRange, period]);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Veri yüklenirken hata oluştu</div>;

  const isDataEmpty = !data || data.length === 0;

  const chartConfig = isDataEmpty
    ? {}
    : Object.keys(data[0] || {})
        .filter((key) => key !== "date")
        .reduce((acc: any, building: string, index: number) => {
          acc[building] = {
            label: building,
            color: `hsl(var(--chart-${index + 1}))`,
          };
          return acc;
        }, {});

  return (
    <Card className="w-full h-auto sm:h-[350px]">
      <CardContent className="relative h-full px-0">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-bold leading-relaxed text-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="text-center sm:text-left text-base sm:text-lg">
                Water Consumption Chart
              </div>
              <div className="w-full sm:w-auto">
                <DatePickerWithRange
                  period={period}
                  dateRange={selectedDateRange}
                  onPeriodChange={setPeriod}
                  onDateRangeChange={setSelectedDateRange}
                  className="text-sm"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        {isDataEmpty ? (
          <div className="text-center py-4 text-sm sm:text-base">
            <p>Seçilen dönem için veri mevcut değil.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value) =>
                  period === "daily"
                    ? moment(value).format("YYYY-MM-DD")
                    : moment(value).format("YYYY-MMMM")
                }
              />
              <YAxis />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const date =
                    period === "daily"
                      ? moment(payload[0].payload.date).format("YYYY-MM-DD") // Günlük format
                      : moment(payload[0].payload.date).format("YYYY-MMMM"); // Aylık format

                  return (
                    <div className="bg-slate-50 p-3 rounded-md shadow-md">
                      <div>{date}</div>
                      {payload.map((entry, index) => {
                        const buildingName = entry.name;
                        const color = chartConfig[buildingName as any]?.color;
                        return (
                          <p className="py-1" key={index} style={{ color }}>
                            {`${buildingName}: ${entry.value} m³`}
                          </p>
                        );
                      })}
                    </div>
                  );
                }}
              />

              <Legend />
              {Object.keys(chartConfig).map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={chartConfig[key].color}
                  radius={4}
                />
              ))}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
