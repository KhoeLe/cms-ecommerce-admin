"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction";

export type CategoriesColumn = {
  id: string
  name: string;
  labelBillboard: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.labelBillboard,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
