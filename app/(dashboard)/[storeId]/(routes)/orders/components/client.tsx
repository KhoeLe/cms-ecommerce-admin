"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {  OrderColumn, columns } from "../[orderId]/components/columns";
import ApiList from "@/components/ui/api-list";
interface Props {
    data: OrderColumn[];
}

function ProductsClient({ data }: Props) {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Orders (${data.length})`}
                    description="Manage Orders for your store"
                />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            {/* <Heading title="API" description="API Calls for orders" />
            <Separator />
            <ApiList entityName="orders" entityIdName="orderId" /> */}
        </>
    );
}

export default ProductsClient;
