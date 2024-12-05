import React, { useState } from "react";
import { useGetBuildingIds } from "@/api/services/building.service";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BuildingDetailsPage from "@/pages/buildings/[id]";

const BuildingPageContainer = () => {
  const { data: buildingIds, isLoading, isError } = useGetBuildingIds();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading buildings...
        </p>
      </div>
    );
  }

  if (isError || !buildingIds) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-medium text-red-500">
          Error loading building IDs.
        </p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < buildingIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="rounded-md">
      <div className="flex justify-between items-center pb-4">
        <Button
          disabled={currentIndex === 0}
          variant="outline"
          onClick={handlePrevious}
          className={`flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          disabled={currentIndex === buildingIds.length - 1}
          variant="outline"
          onClick={handleNext}
          className={`flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md ${
            currentIndex === buildingIds.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <BuildingDetailsPage useLayout={false} id={buildingIds[currentIndex]} />
    </div>
  );
};

export default BuildingPageContainer;
