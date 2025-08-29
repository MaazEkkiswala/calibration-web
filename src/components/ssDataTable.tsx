"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { isEmpty } from "lodash";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppUtils from "@/helper/appUtils";
import { Skeleton } from "./ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function DataTable({
  data,
  isLoading = false,
  columns,
  headerRightChild,
  headerLeftChild = null,
  manualPagination = false,
  pageIndex = 0,
  lastPageIndex = null,
  pageLimit = 10,
  onPageChange = () => {},
  disablePagination = false,
  tableColumnVisibility = {},
}: {
  data: any[];
  isLoading?: boolean;
  columns: ColumnDef<any>[];
  headerRightChild?: React.ReactNode;
  headerLeftChild?: React.ReactNode | null;
  manualPagination?: boolean;
  pageIndex?: number;
  lastPageIndex?: number | null;
  pageLimit?: number;
  isHideColumnSelection?: boolean;
  onPageChange?: Function;
  disablePagination?: boolean;
  tableColumnVisibility?: any;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(tableColumnVisibility);
  const [rowSelection, setRowSelection] = React.useState({});

  const paginationOptions = disablePagination
    ? {}
    : {
        initialState: { pagination: { pageSize: pageLimit } },
        manualPagination: manualPagination,
        getPaginationRowModel: getPaginationRowModel(),
      };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    ...paginationOptions,
  });

  React.useEffect(() => {
    if (!isEmpty(tableColumnVisibility)) {
      setColumnVisibility(tableColumnVisibility);
    }
  }, [tableColumnVisibility]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-row items-center space-x-4">
          {headerLeftChild ? <>{headerLeftChild}</> : null}
        </div>
        <div className="flex flex-row items-center space-x-4">
          {headerRightChild}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
              <>
                {isLoading ? (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell
                          colSpan={columns.length}
                          className="h-16 text-center"
                        >
                          <Skeleton className="w-full h-full" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-16 text-center"
                    >
                      No records.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!disablePagination && (
        <div className="flex items-center w-full justify-between py-4">
          {/* Left side  total records*/}
          <div className="text-sm text-muted-foreground">
            {manualPagination ? (
              <>
                Showing {(pageIndex - 1) * pageLimit + 1}–
                {Math.min(pageIndex * pageLimit, data.length)} of {data.length}{" "}
                records
              </>
            ) : (
              <>
                Showing {table.getState().pagination.pageIndex * pageLimit + 1}–
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * pageLimit,
                  table.getFilteredRowModel().rows.length
                )}{" "}
                of {table.getFilteredRowModel().rows.length} records
              </>
            )}
          </div>

          {/* Right side - pagination */}
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={
                      manualPagination
                        ? () => onPageChange(pageIndex - 1)
                        : () => table.previousPage()
                    }
                    className={
                      (
                        manualPagination
                          ? pageIndex === 1
                          : !table.getCanPreviousPage()
                      )
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {(manualPagination
                  ? Array.from({ length: lastPageIndex ?? 0 })
                  : Array.from({ length: table.getPageCount() })
                ).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={
                        manualPagination
                          ? pageIndex === i + 1
                          : table.getState().pagination.pageIndex === i
                      }
                      onClick={
                        manualPagination
                          ? () => onPageChange(i + 1)
                          : () => table.setPageIndex(i)
                      }
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={
                      manualPagination
                        ? () => onPageChange(pageIndex + 1)
                        : () => table.nextPage()
                    }
                    className={
                      (
                        manualPagination
                          ? pageIndex === lastPageIndex
                          : !table.getCanNextPage()
                      )
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
