import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

// ✅ Add New Employee
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();

    const employee = await prisma.employee.create({
      data: {
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        email: data.email,
        mobileNumber: data.mobileNumber ?? "",
        designation: data.designation ?? "",
        department: data.department ?? "",
        joiningDate: data.joiningDate ?? "",
        employmentType: data.employmentType ?? "",
        salarySlip: data.salarySlip ?? "",
        gender: data.gender ?? "Not specified",
        dateOfBirth: data.dateOfBirth ?? "",
        address: data.address ?? "",
        city: data.city ?? "",
        state: data.state ?? "",
        zipCode: data.zipCode ?? "",
        nationality: data.nationality ?? "",
        officeLocation: data.officeLocation ?? "",
        type: "employee",
        employeeId: data.employeeId ?? "",
        slackId: data.slackId ?? "",
        maritalStatus: data.maritalStatus ?? "",
        userName: data.userName ?? "",
        githubId: data.githubId ?? "",
        workingDays: data.workingDays ?? "",
        skypeId: data.skypeId ?? "",
        appointmentLetter: data.appointmentLetter ?? "",
        experienceLetter: data.experienceLetter ?? "",
        relivingLetter: data.relivingLetter ?? "",
        photoURL: data.photoURL ?? "",
        attendance: data.attendance ?? "",
        checkIn: data.checkIn ?? "",
        checkOut: data.checkOut ?? "",
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Fetch All Employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany();

    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

// ✅ Update Employee
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, ...updatedData } = await req.json();

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

// ✅ Delete Employee
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await req.json();

    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
