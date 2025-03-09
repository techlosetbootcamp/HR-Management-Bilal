import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, profilePicture } = await req.json();
    const userId = session.user.id;

    // ✅ Update user in MongoDB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        profilePicture,
      },
    });

    console.log("✅ User profile updated:", updatedUser);

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
