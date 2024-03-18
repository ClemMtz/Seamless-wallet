import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, address } = body;

    const existingAddressBook = await prismadb.addressBook.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!existingAddressBook) {
      return new NextResponse("Resource Not Found", { status: 404 });
    }

    const updatedAddresssBook = await prismadb.addressBook.update({
      where: {
        id: id as string,
      },
      data: {
        name,
        address,
      },
    });

    return NextResponse.json(updatedAddresssBook);
  } catch (error) {
    console.log("[ADDRESSBOOK_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request | NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    if (!id) {
      return new NextResponse("ID is required for deletion.", { status: 400 });
    }

    const addressBook = await prismadb.addressBook.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(addressBook);
  } catch (error) {
    console.log(`[ADDRESSBOOK_DELETE]`, error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
