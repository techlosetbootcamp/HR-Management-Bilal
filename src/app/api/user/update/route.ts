import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, newEmail } = await req.json();
    if (!email || !newEmail) return NextResponse.json({ error: "Both old and new email are required" }, { status: 400 });

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { email: newEmail },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating email:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
