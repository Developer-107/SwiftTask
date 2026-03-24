import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    
    const { trackingNumber, userId } = await req.json();

    if (!trackingNumber || typeof trackingNumber !== "string") {
      return NextResponse.json(
        { error: "trackingNumber is required and must be a string" },
        { status: 400 }
      );
    }

    if (userId !== undefined && userId !== null) {
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
    }

    const parcel = await prisma.parcel.create({
      data: {
        trackingNumber,
        userId: userId ?? null,
      },
    });

    return NextResponse.json(parcel, { status: 201 });

  } catch (error) {
    console.error("Error creating parcel:", error);
    return NextResponse.json(
      { error: `Failed to create parcel` },
      { status: 500 }
    );
  }
}