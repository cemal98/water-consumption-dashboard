import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  VisibilityState,
} from "@tanstack/react-table";
import { useGetDashboardTableData } from "@/api/services/building.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonthPicker from "../ui/month-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, CheckIcon, ChevronRight } from "lucide-react";

const DashboardTable = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [isMonthPickerOpen, setMonthPickerOpen] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });
  const router = useRouter();

  const { data, isLoading, isError } = useGetDashboardTableData({
    date: moment(selectedMonth).format("YYYY-MM-DD"),
  });

  const handleMonthChange = useCallback((newMonth: Date) => {
    setSelectedMonth(newMonth);
    setMonthPickerOpen(false);
  }, []);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div>{row.getValue("id")}</div>,
      },
      {
        accessorKey: "name",
        header: "Building Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => <div>{row.getValue("location")}</div>,
      },
      {
        accessorKey: "consumption",
        header: "Consumption",
        cell: ({ row }) => {
          const consumption = row.getValue("consumption") as number;
          const formattedConsumption = new Intl.NumberFormat("tr-TR").format(
            consumption
          );
          return <div>{`${formattedConsumption} m³`}</div>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => handleRowClick(row.original.id)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const handleRowClick = (id: string) => {
    router.push(`/buildings/${id}`);
  };

  return (
    <Card className="w-full p-2 sm:p-4">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <CardTitle className="text-lg sm:text-xl font-bold">
          <div className="text-center sm:text-left text-base sm:text-lg">
            Water Consumption Table
          </div>
        </CardTitle>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <Button
              className="flex items-center justify-center w-full sm:w-[120px] text-sm sm:text-base"
              variant="outline"
              onClick={() => setMonthPickerOpen(!isMonthPickerOpen)}
            >
              {moment(selectedMonth).format("MMMM")}
            </Button>
            {isMonthPickerOpen && (
              <div className="absolute top-full right-0 z-50 bg-white border shadow-lg rounded-md p-4 mt-2 w-[270px]">
                <MonthPicker
                  currentMonth={selectedMonth}
                  onMonthChange={handleMonthChange}
                />
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-sm sm:text-base h-[35px] px-3 py-2 flex items-center justify-between"
              >
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="border-gray z-50 mt-2 rounded-md border-[1px] bg-white shadow-lg"
              align="end"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-sm py-2 px-4 flex items-center justify-between hover:bg-gray-100"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    <span>{column.id}</span>
                    {column.getIsVisible() && (
                      <CheckIcon className="h-4 w-4 text-blue-500" />
                    )}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading data</div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.original.id} className="hover:bg-gray-100">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-sm sm:text-base"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
