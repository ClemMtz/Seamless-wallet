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

// export async function GET(_req: Request) {
//   try {
//     const addressBook = await prismadb.addressBook.findMany();

//     // Set Cache-Control header to prevent caching
//     const headers = {
//       "Cache-Control": "no-cache, no-store, must-revalidate",
//       Pragma: "no-cache",
//       Expires: "0",
//     };

//     return new NextResponse(JSON.stringify(addressBook), {
//       headers,
//       status: 200,
//     });
//   } catch (error) {
//     console.log("[ADDRESSBOOK_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

export const dynamic = "force-dynamic";
