import React from "react";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import { ProductsColumn } from "./[productId]/components/columns";
import { formatter } from "@/lib/utils";
import ProductsClient from "./components/client";

interface Props {
    params: {storeId: string;}
}

async function ProductsPage({params}: Props) {
    const products = await prismaDB.product.findMany({
        where: {
            storeId:params.storeId,

        },
        include: {
            store: true,
            category: true,
            size: true ,
            color: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedSizes: ProductsColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        isArchived: item.isArchived,
        isFeatured: item.isFeatured,
        price : formatter.format(item.price.toNumber()),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-6">
                <ProductsClient data={formattedSizes} />
            </div>
        </div>
    );
}

export default ProductsPage;
