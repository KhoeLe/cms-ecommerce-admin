import React from "react";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import ColorsClient from "./components/client";
import { ColorsColumn } from "./[colorId]/components/columns";
import { getColor } from "./[colorId]/actions";

interface Props {
    params: {
        storeId: string;
    }
}

async function ColorsPage({params} : Props) {
    // const colors = await prismaDB.color.findMany({
    //     where: {
    //         storeId: params.storeId
    //       },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    // });

    const colors = await getColor(params.storeId)

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

export default ColorsPage;
