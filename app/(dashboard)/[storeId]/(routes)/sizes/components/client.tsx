"use client";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ApiList from "@/components/ui/api-list";
import { SizesColumn, columns } from "../[sizeId]/components/columns";
interface Props {
    data: SizesColumn[];
}

function SizeClient({ data }: Props) {
    const router = useRouter();
    const params = useParams();

    const onClick = () => {
        router.push(`/${params.storeId}/sizes/new`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage Sizes for your store"
                />
                <Button onClick={onClick}>
                    <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Sizes" />
            <Separator />
            <ApiList entityName="sizes" entityIdName="sizeId" />
        </>
    );
}

export default SizeClient;
