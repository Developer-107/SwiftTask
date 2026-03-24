import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }>}
) {
  try {

    const { id } = await context.params;
    const parcelId = parseInt(id, 10);

    if (isNaN(parcelId)) {
      return NextResponse.json(
        { error: "Invalid parcel ID" },
        { status: 400 }
      );
    }

    const { userId } = await req.json();

    if (userId !== null) {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    const parcel = await prisma.parcel.update({
      where: { id: parcelId },
      data: { userId },
    });

    return NextResponse.json(parcel);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update parcel" },
      { status: 500 }
    );
  }
}
