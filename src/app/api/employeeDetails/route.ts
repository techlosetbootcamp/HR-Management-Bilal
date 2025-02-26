import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Make sure the path is correct

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
    });

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
