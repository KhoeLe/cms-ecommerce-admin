"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction";

export type OrderColumn = {
  id: string
  phone: string;
  address: string;
  totalPrice : string;
  isPaid : boolean;
  products : string
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Product",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }
];
