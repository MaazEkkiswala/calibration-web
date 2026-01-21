"use client";
import SsAvatar from "@/components/ssAvatar";
import DataTable from "@/components/ssDataTable";
import SsIconButton from "@/components/ssIconButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DateUtils from "@/helper/dateUtils";
import {
  IconArrowDown,
  IconArrowsUpDown,
  IconArrowUp,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Column } from "@tanstack/react-table";

export default function Users() {
  const router = useRouter();

  const users = [
    {
      id: 1,
      fullName: "John Doe",
      emailAddress: "john.doe@example.com",
      contactNumber: "+91 9876543210",
      createdAt: "2024-08-01T10:00:00Z",
      isActive: true,
    },
    {
      id: 2,
      fullName: "Jane Smith",
      emailAddress: "jane.smith@example.com",
      contactNumber: "+91 9123456780",
      createdAt: "2024-07-15T09:30:00Z",
      isActive: false,
    },
    {
      id: 3,
      fullName: "Michael Johnson",
      emailAddress: "michael.johnson@example.com",
      contactNumber: "+91 9812345678",
      createdAt: "2024-07-20T14:10:00Z",
      isActive: true,
    },
    {
      id: 4,
      fullName: "Emily Davis",
      emailAddress: "emily.davis@example.com",
      contactNumber: "+91 9988776655",
      createdAt: "2024-07-10T08:45:00Z",
      isActive: true,
    },
    {
      id: 5,
      fullName: "Chris Lee",
      emailAddress: "chris.lee@example.com",
      contactNumber: "+91 9090909090",
      createdAt: "2024-08-05T12:00:00Z",
      isActive: false,
    },
    {
      id: 6,
      fullName: "Sophia Patel",
      emailAddress: "sophia.patel@example.com",
      contactNumber: "+91 9234567890",
      createdAt: "2024-07-25T16:20:00Z",
      isActive: true,
    },
    {
      id: 7,
      fullName: "David Wilson",
      emailAddress: "david.wilson@example.com",
      contactNumber: "+91 9345678901",
      createdAt: "2024-07-05T11:15:00Z",
      isActive: false,
    },
    {
      id: 8,
      fullName: "Olivia Thomas",
      emailAddress: "olivia.thomas@example.com",
      contactNumber: "+91 9456789012",
      createdAt: "2024-07-28T19:30:00Z",
      isActive: true,
    },
    {
      id: 9,
      fullName: "James Brown",
      emailAddress: "james.brown@example.com",
      contactNumber: "+91 9567890123",
      createdAt: "2024-08-02T09:50:00Z",
      isActive: true,
    },
    {
      id: 10,
      fullName: "Ava Martin",
      emailAddress: "ava.martin@example.com",
      contactNumber: "+91 9678901234",
      createdAt: "2024-07-12T15:25:00Z",
      isActive: false,
    },
    {
      id: 11,
      fullName: "Ethan Clark",
      emailAddress: "ethan.clark@example.com",
      contactNumber: "+91 9789012345",
      createdAt: "2024-07-18T13:40:00Z",
      isActive: true,
    },
    {
      id: 12,
      fullName: "Isabella Lewis",
      emailAddress: "isabella.lewis@example.com",
      contactNumber: "+91 9890123456",
      createdAt: "2024-07-30T07:55:00Z",
      isActive: true,
    },
    {
      id: 13,
      fullName: "Mason Walker",
      emailAddress: "mason.walker@example.com",
      contactNumber: "+91 9901234567",
      createdAt: "2024-08-04T17:35:00Z",
      isActive: false,
    },
    {
      id: 14,
      fullName: "Mia Hall",
      emailAddress: "mia.hall@example.com",
      contactNumber: "+91 9012345678",
      createdAt: "2024-07-08T20:10:00Z",
      isActive: true,
    },
    {
      id: 15,
      fullName: "Alexander Allen",
      emailAddress: "alexander.allen@example.com",
      contactNumber: "+91 9123456789",
      createdAt: "2024-07-27T18:05:00Z",
      isActive: true,
    },
    {
      id: 16,
      fullName: "Charlotte Young",
      emailAddress: "charlotte.young@example.com",
      contactNumber: "+91 9234567891",
      createdAt: "2024-07-22T21:20:00Z",
      isActive: false,
    },
    {
      id: 17,
      fullName: "Benjamin King",
      emailAddress: "benjamin.king@example.com",
      contactNumber: "+91 9345678902",
      createdAt: "2024-08-03T14:45:00Z",
      isActive: true,
    },
    {
      id: 18,
      fullName: "Amelia Wright",
      emailAddress: "amelia.wright@example.com",
      contactNumber: "+91 9456789013",
      createdAt: "2024-07-17T10:35:00Z",
      isActive: false,
    },
    {
      id: 19,
      fullName: "Henry Scott",
      emailAddress: "henry.scott@example.com",
      contactNumber: "+91 9567890124",
      createdAt: "2024-08-06T11:55:00Z",
      isActive: true,
    },
    {
      id: 20,
      fullName: "Ella Green",
      emailAddress: "ella.green@example.com",
      contactNumber: "+91 9678901235",
      createdAt: "2024-07-14T09:05:00Z",
      isActive: true,
    },
  ];

  type SortConfig = boolean | string[];
  // true = all sortable, false = none sortable, array = specific columns

  const getColumns = (sortConfig: SortConfig): ColumnDef<any>[] => {
    const isSortable = (key: string) => {
      if (sortConfig === true) return true;
      if (sortConfig === false) return false;
      if (Array.isArray(sortConfig)) return sortConfig.includes(key);
      return false;
    };

    const renderSortableHeader = (label: string, key: string) => ({
      header: ({ column }: { column: Column<any, unknown> }) => {
        const sorted = column.getIsSorted(); // false | "asc" | "desc"
        const sortable = isSortable(key);

        return (
          <div
            className={`flex items-center ${
              sortable ? "cursor-pointer select-none" : ""
            }`}
            onClick={sortable ? column.getToggleSortingHandler() : undefined}
          >
            <span>{label}</span>

            {sortable && (
              <span className="ml-2">
                {sorted === "asc" ? (
                  <IconArrowUp size={16} className="text-violet-600" />
                ) : sorted === "desc" ? (
                  <IconArrowDown size={16} className="text-violet-600" />
                ) : (
                  <IconArrowsUpDown size={16} className="text-gray-400" />
                )}
              </span>
            )}
          </div>
        );
      },
      enableSorting: isSortable(key),
    });
    return [
      {
        accessorKey: "name",
        ...renderSortableHeader("Name", "name"),
        cell: ({ row: { original } }) => (
          <div className="flex flex-row space-x-3 items-center">
            <span
              className="text-sm font-robot text-blue-500 underline cursor-pointer"
              onClick={() => router.push(`/master/detail/${original.id}`)}
            >
              {original.name}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "description",
        ...renderSortableHeader("Description", "description"),
        cell: ({ row: { original } }) => (
          <Label className="text-sm font-robot text-gray-700">
            {original.description || "No Description"}
          </Label>
        ),
      },
      {
        accessorKey: "certificateNo",
        ...renderSortableHeader("Certificate Number", "certificateNo"),
        cell: ({ row: { original } }) => (
          <Label className="text-sm font-robot text-gray-700">
            {original.certificateNo}
          </Label>
        ),
      },
      {
        accessorKey: "expiryDate",
        ...renderSortableHeader("Expiry Date", "expiryDate"),
        cell: ({ row: { original } }) => (
          <Label className="text-sm font-robot">
            {DateUtils.formatDate(original.createdAt)}
          </Label>
        ),
      },
      {
        accessorKey: "isActive",
        ...renderSortableHeader("Status", "isActive"),
        cell: ({ row: { original } }) => (
          <Badge
            className={`w-fit px-2 py-1 rounded-md ${
              original.isActive
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      },
      {
        header: "Action",
        enableSorting: false,
        cell: ({ row: { original } }) => (
          <div className="flex flex-row justify-center items-center space-x-2">
            <SsIconButton
              icon={<IconPencil className="text-violet-700" size={18} />}
              onClick={() => router.push(`/master/${original.id}`)}
            />
            <SsIconButton
              icon={<IconTrash className="text-red-700" size={18} />}
              onClick={() => alert(`Delete user: ${original.fullName}`)}
            />
          </div>
        ),
      },
    ];
  };

  const columns = getColumns(["emailAddress", "createdAt"]);

  return (
    <Card className="mt-4">
      <CardContent className="h-full overflow-y-scroll">
        <DataTable
          isLoading={false}
          data={users}
          columns={columns}
          pageLimit={10}
          pageIndex={1}
          lastPageIndex={1}
          manualPagination={false}
          headerLeftChild={<Input placeholder="Search" onChange={() => {}} />}
          headerRightChild={
            <Button
              onClick={() => router.push("/users/new")}
              variant="outline"
              className=" bg-violet-400 text-white flex flex-row justify-center items-center space-x-3"
            >
              <IconPlus size={18} />
              <span>Create User</span>
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
