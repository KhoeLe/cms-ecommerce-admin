import React from "react";
import prismaDB from "@/lib/prismaDB";
import { format } from "date-fns";
import { OrderColumn } from "./[orderId]/components/columns";
import { formatter } from "@/lib/utils";
import ProductsClient from "./components/client";
interface Props {
    params: {
        storeId: string;
    };
}

async function OrdersPage({ params }: Props) {
    const orders = await prismaDB.order.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    console.log(orders)
    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: item.isPaid,
        products: item.orderItems.map((item) => item.product.name).join(", "),
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-6">
                <ProductsClient data={formattedOrders} />
            </div>
        </div>
    );
}

export default OrdersPage;
