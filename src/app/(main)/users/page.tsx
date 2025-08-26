"use client";
import SsAvatar from "@/components/ssAvatar";
import DataTable from "@/components/ssDataTable";
import SsIconButton from "@/components/ssIconButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DateUtils from "@/helper/dateUtils";
import {
  IconFilter,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";

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
  ];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row: { original } }) => (
        <div className="flex flex-row space-x-3 items-center">
          <SsAvatar
            alt="UserImage"
            fallbackLabel={original.fullName?.slice(0, 2).toUpperCase()}
          />
          <span
            className="text-sm font-robot text-blue-500 underline cursor-pointer"
            onClick={() => router.push(`/users/detail/${original.id}`)}
          >
            {original.fullName}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "emailAddress",
      header: "Email Address",
      cell: ({ row: { original } }) => (
        <Label className="text-sm font-robot text-gray-700">
          {original.emailAddress || "No Email"}
        </Label>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      cell: ({ row: { original } }) => (
        <Label className="text-sm font-robot text-gray-700">
          {original.contactNumber}
        </Label>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row: { original } }) => (
        <Label className="text-sm font-robot">
          {DateUtils.formatDate(original.createdAt)}
        </Label>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
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
      cell: ({ row: { original } }) => (
        <div className="flex flex-row justify-center items-center space-x-2">
          <SsIconButton
            icon={<IconPencil className="text-violet-700" size={18} />}
            onClick={() => router.push(`/users/${original.id}`)}
          />
          <SsIconButton
            icon={<IconTrash className="text-red-700" size={18} />}
            onClick={() => alert(`Delete user: ${original.fullName}`)}
          />
        </div>
      ),
    },
  ];

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
