import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(_req: Request) {
  try {
    const addressBook = await prismadb.addressBook.findMany();

    return NextResponse.json(addressBook);
  } catch (error) {
    console.log("[ADDRESSBOOK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// to insure the data not to be cache and getting fresh data all the time
export const dynamic = "force-dynamic";
