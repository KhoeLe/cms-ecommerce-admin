import React from "react";
import BillBoardClient from "./components/client";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import { BillboardColumn } from "./[billboardId]/components/columns";
interface Props {
    params: {
        storeId: string;
    };
}

async function BillBoardsPage({ params }: Props) {
    const billboards = await prismaDB.billboard.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-6">
                <BillBoardClient data={formattedBillboards} />
            </div>
        </div>
    );
}

export default BillBoardsPage;
