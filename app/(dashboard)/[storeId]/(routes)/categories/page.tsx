import React from "react";
import BillBoardClient from "./components/client";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import { CategoriesColumn } from "./[categoryId]/components/columns";
import CategoryClient from "./components/client";

async function CategoriesPage() {
    const categories = await prismaDB.category.findMany({
        include: {
            store: true,
            billboard: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        labelBillboard: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    );
}

export default CategoriesPage;
