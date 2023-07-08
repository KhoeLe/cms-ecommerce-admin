"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiList from "@/components/ui/api-list";
import { ProductsColumn, columns } from "../[productId]/components/columns";
interface Props {
    data: ProductsColumn[];
}

function ProductsClient({ data }: Props) {
    const router = useRouter();
    const params = useParams();

    const onClick = () => {
        router.push(`/${params.storeId}/products/new`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage Products for your store"
                />
                <Button onClick={onClick}>
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Products" />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
}

export default ProductsClient;
