import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 Register API Hit");

    const { name, email, password } = await req.json();
    console.log("🔹 Received Data:", { name, email });

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("User already exists:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔹 Hashed Password Generated");

    const user = await prisma.user.create({
      data: { name, email, Password: hashedPassword },
    });

    console.log("User Registered Successfully:", user.email);

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error Registering User:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
