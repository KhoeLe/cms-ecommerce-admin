"use server";

import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const addColor = async (
    data: { name: string; value: string },
    storeId: string
) => {

    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!data.name) {
        return new NextResponse("Name's requited", { status: 400 });
    }

    if (!data.value) {
        return new NextResponse("Value's requited", { status: 400 });
    }

   const color =  await prismaDB.color.create({
        data: {
            name: data.name,
            value: data.value,
            storeId: storeId,
        },
    });

    // return color
    return {
        message: "colors-created",
        status: 200,
      };

};

export const getColor = async (storeId: string) => {
    const colors =  await prismaDB.color.findMany({
        where: {
            storeId: storeId,
        },
        orderBy:{
            createdAt: "desc",
        }
    });

    return colors
}
