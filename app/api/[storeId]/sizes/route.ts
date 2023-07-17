import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name's requited", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value's requited", { status: 400 });
        }

        const category = await prismaDB.size.create({
            data: {
                name,
                value,
                storeId: params.storeId,
            },
        });

        return new NextResponse(JSON.stringify(category), { status: 200 });

        // return NextResponse.json(store);
    } catch (error) {
        console.error("Billboard POST Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}


export async function GET(req: Request,  { params }: { params: { storeId: string } }){
    try {
        // const {storeId} = params


        const sizes =  await prismaDB.size.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return new NextResponse(JSON.stringify(sizes), { status: 200 });

    } catch (error) {
        console.error("Store GET Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}
