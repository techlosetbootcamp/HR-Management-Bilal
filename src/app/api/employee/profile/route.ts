import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"; // Make sure your Prisma client is correctly imported

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new NextResponse(JSON.stringify({ error: "Missing email" }), { status: 400 });
    }

    console.log("Fetching employee with email:", email);

    // Find the employee by email
    const employee = await prisma.employee.findUnique({
      where: { email },
    });

    if (!employee) {
      console.error("❌ Employee not found:", email);
      return new NextResponse(JSON.stringify({ error: "Employee not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching employee:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
