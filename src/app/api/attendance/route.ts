import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

// ✅ Get All Attendance Records
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const attendances = await prisma.attendance.findMany({
      include: {
        employee: true,
      },
    });

    if (!attendances) {
      return NextResponse.json(
        { error: "No attendance records found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Add Attendance Record
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Add null check for request body
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    const {
      employeeId,
      date,
      checkIn,
      checkOut,
      breakTime,
      workingHours,
      status,
    } = body;

    if (!employeeId || !date || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const attendanceData: any = {
      employeeId,
      date: new Date(date),
      status,
      breakTime: breakTime || null,
      workingHours: workingHours || null,
    };

    if (checkIn) attendanceData.checkIn = new Date(checkIn);
    if (checkOut) attendanceData.checkOut = new Date(checkOut);

    const attendance = await prisma.attendance.create({
      data: attendanceData,
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    console.error(
      "Error creating attendance:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
