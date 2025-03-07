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
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../.././../../../lib/prisma"; // Ensure the correct import
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../../lib/auth";

// export async function GET(req: NextRequest, context: { params: { id: string } }) {
//   try {
//     const { id } = await context.params; // ✅ Await context.params

//     if (!id) {
//       console.error("❌ Employee ID is missing");
//       return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
//     }

//     console.log("🔍 Fetching employee with ID:", id);
//     const employee = await prisma.employee.findUnique({ where: { id } });

//     if (!employee) {
//       console.error("❌ Employee not found:", id);
//       return NextResponse.json({ error: "Employee not found" }, { status: 404 });
//     }

//     // console.log("✅ Employee fetched successfully:", employee);
//     return NextResponse.json(employee);
//   } catch (error: any) {
//     console.error("❌ Server error:", error);
//     return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
//   }
// }
// // export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// //   const session = await getServerSession(authOptions);
// //   if (!session) {
// //     return new NextResponse("Unauthorized", { status: 401 });
// //   }

// //   console.log("🔍 Fetching employee with ID:", params.id);

// //   if (session.user.role !== "ADMIN" && session.user.id !== params.id) {
// //     console.log("🚫 Forbidden: User tried to access another profile.");
// //     return new NextResponse("Forbidden", { status: 403 });
// //   }

// //   const employee = await prisma.employee.findUnique({ where: { id: params.id } });
// //   if (!employee) {
// //     console.log("❌ Employee not found:", params.id);
// //     return new NextResponse("Employee not found", { status: 404 });
// //   }

// //   return NextResponse.json(employee);
// // }
// export async function PATCH(req: NextRequest, context: any) {
//     const params = await context.params; // ✅ Await `params`
//     const id = params?.id; // ✅ Extract `id` after awaiting

//     if (!id) {
//         return new Response(JSON.stringify({ error: "Employee ID is missing" }), { status: 400 });
//     }

//     const body = await req.json();

//     if (!body) {
//         return new Response(JSON.stringify({ error: "Missing request body" }), { status: 400 });
//     }

//     try {
//         const updatedEmployee = await prisma.employee.update({
//             where: { id },
//             data: body,
//         });

//         return new Response(JSON.stringify(updatedEmployee), { status: 200 });
//     } catch (error) {
//         console.error("Error updating employee:", error);
//         return new Response(JSON.stringify({ error: "Failed to update employee" }), { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "../.././../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";

/** 🚀 GET: Fetch Employee Details */
export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = await context.params; // Ensure params are awaited
  
      if (!id) {
        return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
      }
  
      // Query employee details from the database
      const employee = await prisma.employee.findUnique({
        where: { id }, // Prisma stores ID as a string
      });
  
      if (!employee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
      }
  
      return NextResponse.json(employee, { status: 200 });
    } catch (error) {
      console.error("Error fetching employee:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

/** 🚀 PATCH: Update Employee Details */
// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const { id } = params;
//   if (!id) {
//     return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
//   }

//   const body = await req.json();
//   if (!body) {
//     return NextResponse.json({ error: "Missing request body" }, { status: 400 });
//   }

//   // 🛑 Admins can update anyone, employees can only edit themselves
//   if (session.user.role !== "ADMIN" && session.user.id !== id) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   try {
//     const updatedEmployee = await prisma.employee.update({
//       where: { id },
//       data: body,
//     });

//     return NextResponse.json(updatedEmployee);
//   } catch (error) {
//     console.error("❌ Error updating employee:", error);
//     return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
//   }
// }
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params; // ✅ Ensure params are extracted correctly
    if (!id) {
      return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/** 🚀 POST: Create Employee (Admin Only) */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  if (!body) {
    return NextResponse.json({ error: "Missing request body" }, { status: 400 });
  }

  try {
    const newEmployee = await prisma.employee.create({ data: body });
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating employee:", error);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}

/** 🚀 DELETE: Remove Employee (Admin Only) */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
  }

  try {
    await prisma.employee.delete({ where: { id } });
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}








//////////////////////////////////////


// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../.././../../../lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../../lib/auth";

// /** 🚀 GET: Fetch Employee Details */
// export async function GET(req: NextRequest, context: any) {
//   try {
//     const params = await context.params; // ✅ Awaiting params properly
//     const { id } = params;

//     if (!id) {
//       console.error("❌ Missing employee ID in request!");
//       return NextResponse.json({ error: "Missing employee ID" }, { status: 400 });
//     }

//     console.log("🔍 Fetching employee with ID:", id);

//     const employee = await prisma.employee.findUnique({
//       where: { id },
//     });

//     if (!employee) {
//       console.error("❌ Employee not found:", id);
//       return NextResponse.json({ error: "Employee not found" }, { status: 404 });
//     }

//     return NextResponse.json(employee, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error fetching employee:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// /** 🚀 PATCH: Update Employee Details */
// export async function PATCH(req: NextRequest, context: any) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const params = await context.params; // ✅ Awaiting params
//   const { id } = params;

//   if (!id) {
//     return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
//   }

//   const body = await req.json();
//   if (!body) {
//     return NextResponse.json({ error: "Missing request body" }, { status: 400 });
//   }

//   try {
//     // 🛑 Admins can update anyone, employees can only edit themselves
//     if (session.user.role !== "ADMIN" && session.user.id !== id) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const updatedEmployee = await prisma.employee.update({
//       where: { id },
//       data: body,
//     });

//     return NextResponse.json(updatedEmployee, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error updating employee:", error);
//     return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
//   }
// }

// /** 🚀 DELETE: Remove Employee (Admin Only) */
// export async function DELETE(req: NextRequest, context: any) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "ADMIN") {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   const params = await context.params; // ✅ Awaiting params
//   const { id } = params;

//   if (!id) {
//     return NextResponse.json({ error: "Employee ID is required" }, { status: 400 });
//   }

//   try {
//     await prisma.employee.delete({ where: { id } });
//     return NextResponse.json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting employee:", error);
//     return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
//   }
// }