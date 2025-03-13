// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../lib/auth";
// import prisma from "../../../../lib/prisma";

// // ✅ Fetch All Employees (For Admin)
// export async function GET(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "ADMIN") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const employees = await prisma.employee.findMany({
//       select: {
//         photoURL: true,
//         id: true,
//         firstName: true,
//         lastName: true,
//         email: true,
//       },
//     });

//     return NextResponse.json(employees, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// // ✅ Manually Add Attendance (Admin Only)
// // ✅ Updated Attendance POST handler
// export async function POST(req: NextRequest) {
//     try {
//       const session = await getServerSession(authOptions);
//       if (!session || session.user.role !== "ADMIN") {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//       }
  
//       // ✅ Ensure body exists
//       if (!req.body) {
//         return NextResponse.json({ error: "Missing request body" }, { status: 400 });
//       }
  
//       const { employeeId, checkIn, checkOut, status } = await req.json();
  
//       if (!employeeId || !status) {
//         return NextResponse.json({ error: "Employee ID and status are required" }, { status: 400 });
//       }
  
//       const attendance = await prisma.attendance.create({
//         data: {
//           employeeId,
//           checkIn: checkIn ? new Date(checkIn).toISOString() : new Date(0).toISOString(),
//           checkOut: checkOut ? new Date(checkOut).toISOString() : new Date(0).toISOString(),
//           status,
//         },
//       });
  
//       return NextResponse.json(attendance, { status: 201 });
//     } catch (error) {
//       console.error("Error adding attendance:", error);
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
//   }
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

// ✅ Get All Attendance Records
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const attendances = await prisma.attendance.findMany({
      include: {
        employee: true,
      },
    });

    if (!attendances) {
      return NextResponse.json({ error: "No attendance records found" }, { status: 404 });
    }

    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const { employeeId, date, checkIn, checkOut, breakTime, workingHours, status } = body;

    // Add validation for all required fields
    if (!employeeId || !date || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Handle date conversions safely
    const attendanceData: any = {
      employeeId,
      date: new Date(date),
      status,
      breakTime: breakTime || null,
      workingHours: workingHours || null,
    };

    // Only add valid dates
    if (checkIn) attendanceData.checkIn = new Date(checkIn);
    if (checkOut) attendanceData.checkOut = new Date(checkOut);

    const attendance = await prisma.attendance.create({
      data: attendanceData
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    // Add proper error logging
    console.error("Error creating attendance:", error instanceof Error ? error.message : error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
