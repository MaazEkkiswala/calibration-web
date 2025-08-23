'use client'

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
} from '@tanstack/react-table'
import { isEmpty } from 'lodash'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AppUtils from '@/helper/appUtils'
import { Skeleton } from './ui/skeleton'

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
  onPageChange = () => { },
  disablePagination = false,
  tableColumnVisibility = {}
}: {
  data: any[],
  isLoading?: boolean,
  columns: ColumnDef<any>[],
  headerRightChild?: React.ReactNode,
  headerLeftChild?: React.ReactNode | null,
  manualPagination?: boolean,
  pageIndex?: number,
  lastPageIndex?: number | null,
  pageLimit?: number,
  isHideColumnSelection?: boolean,
  onPageChange?: Function
  disablePagination?: boolean,
  tableColumnVisibility?: any
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(tableColumnVisibility)
  const [rowSelection, setRowSelection] = React.useState({})

  const paginationOptions = disablePagination ? {} : {
    initialState: { pagination: { pageSize: pageLimit } },
    manualPagination: manualPagination,
    getPaginationRowModel: getPaginationRowModel(),
  }

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
    <div className='w-full'>
      <div className='flex items-center justify-between py-4'>
        <div className='flex flex-row items-center space-x-4'>
          {
            headerLeftChild
              ? <>{headerLeftChild}</>
              : null
          }
        </div>
        <div className='flex flex-row items-center space-x-4'>
          {headerRightChild}
        </div>
      </div>
      <div className='rounded-md border'>
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                {
                  isLoading
                    ? <>
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className='h-16 text-center'
                        >
                          <Skeleton className='w-full h-full' />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className='h-16 text-center'
                        >
                          <Skeleton className='w-full h-full' />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className='h-16 text-center'
                        >
                          <Skeleton className='w-full h-full' />
                        </TableCell>
                      </TableRow>
                    </>
                    : <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className='h-16 text-center'
                      >
                        No records.
                      </TableCell>
                    </TableRow>
                }
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={AppUtils.classNames(
        'items-center justify-end space-x-2 py-4',
        disablePagination ? 'hidden' : 'flex'
      )}>
        {
          manualPagination
            ? <>
              <div className='flex-1 text-sm text-muted-foreground'>
                {(pageIndex)} of{' '}
                {lastPageIndex} row(s) selected.
              </div>
              <div className='space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onPageChange(pageIndex - 1)}
                  disabled={pageIndex === 1}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onPageChange(pageIndex + 1)}
                  disabled={pageIndex === lastPageIndex}
                >
                  Next
                </Button>
              </div>
            </>
            : <>
              <div className='flex-1 text-sm text-muted-foreground'>
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className='space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </>
        }
      </div>
    </div>
  )
}