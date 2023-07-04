import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request,){

    try {
        const {userId} =  auth();
        const body =  await req.json();

        const {name} = body;

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!name){
            return new NextResponse("Name's requited", { status: 400 });
        }

        const store =  await prismaDB.store.create({
            data: {
                name,
                userId
            }
        });

        return new NextResponse(JSON.stringify(store), { status: 200 });

        // return NextResponse.json(store);

    } catch (error) {
        console.error("Store POST Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}
