import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

// ✅ Fetch Employee by Email
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      console.log("Fetching employee with email:", email);
      const employee = await prisma.employee.findUnique({ where: { email } });

      if (!employee) {
        console.error("❌ Employee not found:", email);
        return new NextResponse(
          JSON.stringify({ error: "Employee not found" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify(employee), { status: 200 });
    }

    // ✅ Fetch All Employees
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employee(s):", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

// ✅ Add New Employee
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const rawBody = await req.text();
    console.log("Raw Request Body:", rawBody);

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch (jsonError) {
      console.error("Invalid JSON in request:", jsonError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    if (!data.firstName || !data.email) {
      return NextResponse.json(
        { error: "Missing required fields: firstName and email" },
        { status: 400 }
      );
    }

    const employee = await prisma.employee.create({ data });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Update Employee
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    let data;
    try {
      data = await req.json();
    } catch (jsonError) {
      console.error("Invalid JSON in request:", jsonError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { id, ...updatedData } = data;
    if (!id) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: updatedData,
    });
    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    );
  }
}

// ✅ Delete Employee
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
    }

    console.log("Deleting attendance records for employee:", id);
    
    await prisma.attendance.deleteMany({
      where: { employeeId: id },
    });

    console.log("Deleting employee:", id);

    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { status: 500 }
    );
  }
}
