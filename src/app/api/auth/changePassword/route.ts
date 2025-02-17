import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    console.log("Password Change API Hit");

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log("Session:", session);

    const { oldPassword, newPassword } = await req.json();
    console.log("Request Body:", { oldPassword, newPassword });

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ message: "Old and new passwords are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.Password) {
      console.log("User Not Found or Password Missing in DB");
      return NextResponse.json({ message: "User not found or missing password" }, { status: 404 });
    }

    console.log("🔹 Fetched User from DB:", user);

    const isPasswordValid = await bcrypt.compare(oldPassword, user.Password);
    console.log("🔹 Password Match Result:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Incorrect old password" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: user.email },
      data: { Password: hashedPassword },
    });

    console.log("✅ Password changed successfully for:", user.email);

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
