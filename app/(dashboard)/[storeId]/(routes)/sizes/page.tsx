import React from "react";
import BillBoardClient from "./components/client";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import CategoryClient from "./components/client";
import { SizesColumn } from "./[sizeId]/components/columns";
import SizeClient from "./components/client";

interface Props {
    params: {
        storeId: string;
    }
}

async function SizesPage({params}: Props) {
    const sizes = await prismaDB.size.findMany({
        where: {
            storeId:params.storeId,
        },
        include: {
            store: true,

        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedSizes: SizesColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
}

export default SizesPage;
