import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {

        const body = await req.json();
        const { name, address, publicAddress } = body;


        if (!name) {
            return new NextResponse('Name is required', { status: 401 });
        }

        if (!address) {
            return new NextResponse('Address is required', { status: 401 });
        }

        const addressBook = await prismadb.addressBook.create({
            data: {
                name,
                address,
                publicAddress,

            }
        });

        return NextResponse.json(addressBook);

    } catch (error) {
        console.log('[ADDRESSBOOK_POST]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}