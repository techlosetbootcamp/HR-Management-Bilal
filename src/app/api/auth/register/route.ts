import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Set role: Only allow 'ADMIN' if explicitly provided, default is 'EMPLOYEE'
    const userRole = role === "ADMIN" ? "ADMIN" : "EMPLOYEE";

    const user = await prisma.user.create({
      data: { name, email, Password: hashedPassword, role: userRole },
    });

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error Registering User:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
