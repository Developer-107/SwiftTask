import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export async function GET(req: NextRequest) {
  try {

    const unassignedParcels = await prisma.parcel.findMany({
        where: { userId: null },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(unassignedParcels);
  } catch (error) {
    console.error("Error fetching unassigned parcels:", error);
    return NextResponse.json({ error: "Failed to fetch unassigned parcels" }, { status: 500 });
  }
}
