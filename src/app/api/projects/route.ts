import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../..//lib/auth";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const employeeId = searchParams.get("employeeId");

  try {
    const projects = employeeId
      ? await prisma.project.findMany({
          where: { assignedEmployeeId: employeeId },
        })
      : await prisma.project.findMany();

    // console.log("Projects fetched:", projects);
    return NextResponse.json(projects);
  } catch (error: unknown) {
    const err = error as Error;
    // console.error("Error in GET /api/projects:", err.message);
    return NextResponse.json(
      { message: "Error fetching projects", error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    const { title, description, assignedEmployeeId, startDate, endDate } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        assignedEmployeeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    const employee = await prisma.employee.findUnique({
      where: { id: assignedEmployeeId },
    });

    if (employee && employee.email) {
      const employeeUser = await prisma.user.findUnique({
        where: { email: employee.email },
      });

      if (employeeUser) {
        const employeeNotification = {
          userId: employeeUser.id,
          message: `You have been assigned a new project: "${project.title}" Project Deadline is ${project.endDate}`,
        };

        await prisma.notification.create({
          data: employeeNotification,
        });
        console.log("Employee notification created:", employeeNotification);
      }
    }

    return NextResponse.json(project);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error creating project:", err.message);
    return NextResponse.json(
      { message: "Error creating project", error: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const action = searchParams.get("action");

  if (action === "complete" && id) {
    try {
      const updatedProject = await prisma.project.update({
        where: { id },
        data: { status: "COMPLETED" },
      });

      const admins = await prisma.user.findMany({
        where: { role: "ADMIN" },
      });

      const adminNotifications = admins.map((admin) => ({
        userId: admin.id,
        message: `Project "${updatedProject.title}" has been marked as completed by ${session.user.name}.`,
      }));

      await prisma.notification.createMany({
        data: adminNotifications,
      });
      console.log("Admin notifications created:", adminNotifications);

      return NextResponse.json(updatedProject);
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error updating project:", err.message);
      return NextResponse.json(
        { message: "Error updating project", error: err.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "Bad request: missing project id or invalid action" },
    { status: 400 }
  );
}
