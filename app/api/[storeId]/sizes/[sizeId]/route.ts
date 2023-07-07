import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { sizeId: string } }
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

        const size = await prismaDB.size.update({
            where: {
                id: params.sizeId,
            },
            data: {
                value,
                name,
            },
        });

        return new NextResponse(JSON.stringify(size), { status: 200 });

        // return NextResponse.json(store);
    } catch (error) {
        console.error("Size PATCH Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}


export async function GET(req: Request,  { params }: { params: { sizeId: string } }){
    try {
        const size =  await prismaDB.size.findFirst({
            where: {
                id: params.sizeId,
            }
        });

        return new NextResponse(JSON.stringify(size), { status: 200 });

    } catch (error) {
        console.error("CategoryId GET Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request,  { params }: { params: { sizeId: string } }){
    try {
        const size =  await prismaDB.size.delete({
            where: {
                id: params.sizeId,
            }
        });

        return new NextResponse(JSON.stringify(size), { status: 200 });
    } catch (error) {
        console.error("CategoryId DELETE Error: ", error);
        return new NextResponse("Server Error", { status: 500 });

    }
}
