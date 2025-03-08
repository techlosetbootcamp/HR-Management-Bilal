import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// ✅ Fetch Employee by Email or Department
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const department = searchParams.get("department");

    if (email) {
      console.log("Fetching employee with email:", email);
      const employee = await prisma.employee.findUnique({ where: { email } });

      if (!employee) {
        console.error("❌ Employee not found:", email);
        return new NextResponse(JSON.stringify({ error: "Employee not found" }), { status: 404 });
      }
      return new NextResponse(JSON.stringify(employee), { status: 200 });
    }

    if (department) {
      console.log("Fetching employees for department:", department);
      const employees = await prisma.employee.findMany({ where: { department } });

      if (employees.length === 0) {
        console.error("❌ No employees found for department:", department);
        return new NextResponse(JSON.stringify({ error: "No employees found for this department" }), { status: 404 });
      }
      return new NextResponse(JSON.stringify(employees), { status: 200 });
    }

    // ✅ Fetch All Employees
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employee(s):", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// ... existing POST, PATCH, DELETE methods ...