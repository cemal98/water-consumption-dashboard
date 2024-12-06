"use client";

import React from "react";
import { useRouter } from "next/router";
import { useGetBuildingDetails } from "@/api/services/building.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/Layout/Layout";

type BuildingDetailsPageProps = {
  id?: string;
  useLayout?: boolean;
};

const BuildingDetailsPage = ({
  id: externalId,
  useLayout = true,
}: BuildingDetailsPageProps) => {
  const router = useRouter();
  const id = externalId || (router.query.id as string);

  const { data, isLoading, isError } = useGetBuildingDetails(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading building details...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-medium text-red-500">
          Error loading building details.
        </p>
      </div>
    );
  }

  const buildingName = data?.[0]?.name || "Unknown Building";

  // Chart Data
  const chartData = data?.map((row) => ({
    date: row.date as string,
    consumption: row.consumption as string,
  }));

  const chartConfig: ChartConfig = {
    consumption: {
      label: "Water Consumption",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Layout hideSidebar={!useLayout}>
      <Card>
        <CardHeader>
          <CardTitle>{buildingName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => value.slice(0, 10)}
                  tickMargin={8}
                  axisLine={false}
                />
                <YAxis />
                <Tooltip
                  content={({ payload, label }) => {
                    if (!payload || payload.length === 0) return null;

                    return (
                      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
                        <p className="text-sm font-semibold text-gray-600">
                          {label}
                        </p>
                        <div className="mt-2">
                          {payload.map((entry, index) => (
                            <p
                              key={index}
                              className="text-sm"
                              style={{ color: entry.color }}
                            >
                              {`${entry.name}: ${entry.value} m³`}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  }}
                  cursor={{ fill: "rgba(63, 131, 248, 0.1)" }}
                />

                <Area
                  type="monotone"
                  dataKey="consumption"
                  fill="var(--color-consumption)"
                  stroke="var(--color-consumption)"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="bg-white rounded-lg border border-spacing-1 shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Consumption</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chartData.map((row, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{`${row.consumption} m³`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default BuildingDetailsPage;
