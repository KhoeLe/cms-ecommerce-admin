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

        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name's requited", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("BillBoard's requited", { status: 400 });
        }

        const category = await prismaDB.category.create({
            data: {
                name,
                billboardId,
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

        console.log(params)

        const category =  await prismaDB.category.findMany({
            where: {
                storeId: params.storeId,
            }
        });

        return new NextResponse(JSON.stringify(category), { status: 200 });

    } catch (error) {
        console.error("Store GET Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}