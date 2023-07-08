import React from "react";
import BillBoardClient from "./components/client";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import CategoryClient from "./components/client";
import ColorsClient from "./components/client";
import { ColorsColumn } from "./[colorId]/components/columns";

async function CategoriesPage() {
    const colors = await prismaDB.color.findMany({
        include: {
            store: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedSizes: ColorsColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-6">
                <ColorsClient data={formattedSizes} />
            </div>
        </div>
    );
}

export default CategoriesPage;
