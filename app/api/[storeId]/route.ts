import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,  { params }: { params: { storeId: string } } ){

    try {
        const {userId} =  auth();
        const body =  await req.json();

        const {name} = body;
        const {storeId} = params

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!name){
            return new NextResponse("Name's requited", { status: 400 });
        }

        const store =  await prismaDB.store.update({
            where: {
                id: storeId,
            }, data: {
                name,
            }
        });

        return new NextResponse(JSON.stringify(store), { status: 200 });

    } catch (error) {
        console.error("Store PATCH Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}


export async function DELETE(req: Request,  { params }: { params: { storeId: string } }){

    try {
        const {userId} =  auth();

        const {storeId} = params

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const store =  await prismaDB.store.delete({
            where: {
                id: storeId,
            }
        });

        return new NextResponse('Delete Success', { status: 202 })

    } catch (error) {
        console.error("Store DELETE Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}
