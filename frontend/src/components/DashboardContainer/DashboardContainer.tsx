import { useGetBuildings } from "@/api/services/building.service";
import { NextPage } from "next";
import React from "react";
import DashboardChart from "../DashboardChart/DashboardChart";
import DashboardTable from "../DashboardTable/DashboardTable";

const DashboardContainer: NextPage = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex-1 flex justify-center items-center w-full">
        <DashboardChart />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <DashboardTable />
      </div>
    </div>
  );
};

export default DashboardContainer;
