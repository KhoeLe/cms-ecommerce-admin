import prismaDB from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { label, imageUrl } = body;
        console.log(params.billboardId)

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Name's requited", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image's requited", { status: 400 });
        }

        const billboard = await prismaDB.billboard.update({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl,
            },
        });

        return new NextResponse(JSON.stringify(billboard), { status: 200 });

        // return NextResponse.json(store);
    } catch (error) {
        console.error("Billboard PATCH Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}
