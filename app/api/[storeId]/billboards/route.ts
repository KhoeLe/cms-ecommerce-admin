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

        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!label) {
            return new NextResponse("Name's requited", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image's requited", { status: 400 });
        }

        const billboard = await prismaDB.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId,
            },
        });

        return new NextResponse(JSON.stringify(billboard), { status: 200 });

        // return NextResponse.json(store);
    } catch (error) {
        console.error("Billboard POST Error: ", error);
        return new NextResponse("Server Error", { status: 500 });
    }
}


// export async function GET(){
//     try {
//         const billboards = await prismaDB.billboard.findMany({
//             include: {
//                 store: true
//             }
//         });

//         return new NextResponse(JSON.stringify(billboards), { status: 200 });
//     } catch (error) {
//         console.error("Billboard GET Error: ", error);
//         return new NextResponse("Server Error", { status: 500 });
//     }

// }
