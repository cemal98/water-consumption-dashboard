import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MonthPicker from "../ui/month-picker";

import moment from "moment";
import { DateRange } from "react-day-picker";

type DatePickerWithRangeProps = {
  period: string;
  dateRange: DateRange | undefined;
  onPeriodChange: (newPeriod: string) => void;
  onDateRangeChange: (newRange: DateRange | undefined) => void;
  className?: string;
};

export function DatePickerWithRange({
  period,
  dateRange,
  onPeriodChange,
  onDateRangeChange,
  className,
}: DatePickerWithRangeProps) {
  const handleFromChange = (selected: Date | undefined) => {
    onDateRangeChange({
      from: selected || undefined,
      to: dateRange?.to,
    });
  };

  const handleToChange = (selected: Date | undefined) => {
    onDateRangeChange({
      from: dateRange?.from,
      to: selected || undefined,
    });
  };

  const handlePeriodChange = (newPeriod: string) => {
    onPeriodChange(newPeriod);
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a period" />
          </SelectTrigger>
          <SelectContent className="bg-slate-50">
            <SelectItem value="daily">
              <span className="font-medium transition leading-3 tracking-normal duration-200 text-center">
                Daily
              </span>
            </SelectItem>
            <SelectItem value="monthly">
              <span className="font-medium transition leading-3 tracking-normal duration-200">
                Monthly
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Input
              value={
                dateRange?.from
                  ? moment(dateRange.from).format("MMM D, YYYY")
                  : ""
              }
              placeholder="Start Date"
              className="w-full sm:w-[150px] hover:cursor-pointer hover:opacity-80 font-medium"
              readOnly
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            {period === "daily" ? (
              <Calendar
                initialFocus
                mode="single"
                selected={dateRange?.from}
                onSelect={handleFromChange}
                defaultMonth={dateRange?.from || new Date()}
                numberOfMonths={1}
              />
            ) : (
              <MonthPicker
                currentMonth={dateRange?.from || new Date()}
                onMonthChange={handleFromChange}
              />
            )}
          </PopoverContent>
        </Popover>
        <div className="hidden sm:block">-</div>
        <Popover>
          <PopoverTrigger asChild>
            <Input
              value={
                dateRange?.to ? moment(dateRange.to).format("MMM D, YYYY") : ""
              }
              placeholder="End Date"
              className="w-full sm:w-[150px] hover:cursor-pointer hover:opacity-80 font-medium"
              readOnly
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            {period === "daily" ? (
              <Calendar
                initialFocus
                mode="single"
                selected={dateRange?.to}
                onSelect={handleToChange}
                defaultMonth={dateRange?.to || dateRange?.from || new Date()}
                numberOfMonths={1}
                disabled={
                  dateRange?.from ? { before: dateRange.from } : undefined
                }
              />
            ) : (
              <MonthPicker
                currentMonth={dateRange?.to || new Date()}
                onMonthChange={handleToChange}
                minDate={dateRange?.from}
              />
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
