import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../lib/prisma"; // Ensure correct import path

export async function POST(req: NextRequest) {
  try {
    console.log("🔹 Register API Hit");

    // Parse request body
    const { name, email, password } = await req.json();
    console.log("🔹 Received Data:", { name, email });

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔹 Hashed Password Generated");

    // Create new user in database
    const user = await prisma.user.create({
      data: { name, email, Password: hashedPassword }, // Ensure correct field name
    });

    console.log("✅ User Registered Successfully:", user.email);

    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    console.error("❌ Error Registering User:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
