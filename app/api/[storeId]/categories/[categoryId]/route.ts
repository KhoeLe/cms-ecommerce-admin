import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { categoryId: string } }
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
            return new NextResponse("Billboard's requited", { status: 400 });
        }

        const category = await prismaDB.category.update({
            where: {
                id: params.categoryId,
            },
            data: {
                billboardId,
                name,
            },
        });

        return new NextResponse(JSON.stringify(category), { status: 200 });

        // return NextResponse.json(store);
    } catch (error) {
        console.error("Category PATCH Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}


export async function GET(req: Request,  { params }: { params: { categoryId: string } }){
    try {

        console.log( 'hello',params.categoryId)

        const category =  await prismaDB.category.findFirst({
            where: {
                id: params.categoryId
              },
              include: {
                billboard: true
              }
        });

        return new NextResponse(JSON.stringify(category), { status: 200 });

    } catch (error) {
        console.error("CategoryId GET Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request,  { params }: { params: { categoryId: string } }){
    try {
        const billboard =  await prismaDB.category.delete({
            where: {
                id: params.categoryId,
            }
        });

        return new NextResponse(JSON.stringify(billboard), { status: 200 });
    } catch (error) {
        console.error("CategoryId DELETE Error: ", error);
        return new NextResponse("Server Error", { status: 500 });

    }
}
