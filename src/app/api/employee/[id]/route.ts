// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../../lib/prisma"; // Ensure Prisma is correctly imported

// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//   try {
//     const { id } = await context.params; // Ensure params are awaited

//     if (!id) {
//       return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
//     }

//     // Query employee details from the database
//     const employee = await prisma.employee.findUnique({
//       where: { id }, // Prisma stores ID as a string
//     });

//     if (!employee) {
//       return NextResponse.json({ error: "Employee not found" }, { status: 404 });
//     }

//     return NextResponse.json(employee, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching employee:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import prisma from "../.././../../../lib/prisma"; // Ensure the correct import

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; // ✅ Await context.params

    if (!id) {
      console.error("❌ Employee ID is missing");
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
    }

    console.log("🔍 Fetching employee with ID:", id);
    const employee = await prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      console.error("❌ Employee not found:", id);
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    console.log("✅ Employee fetched successfully:", employee);
    return NextResponse.json(employee);
  } catch (error: any) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
    const params = await context.params; // ✅ Await `params`
    const id = params?.id; // ✅ Extract `id` after awaiting

    if (!id) {
        return new Response(JSON.stringify({ error: "Employee ID is missing" }), { status: 400 });
    }

    const body = await req.json();

    if (!body) {
        return new Response(JSON.stringify({ error: "Missing request body" }), { status: 400 });
    }

    try {
        const updatedEmployee = await prisma.employee.update({
            where: { id },
            data: body,
        });

        return new Response(JSON.stringify(updatedEmployee), { status: 200 });
    } catch (error) {
        console.error("Error updating employee:", error);
        return new Response(JSON.stringify({ error: "Failed to update employee" }), { status: 500 });
    }
}


  
